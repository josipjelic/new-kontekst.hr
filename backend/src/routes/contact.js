import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Previše zahtjeva. Pokušajte ponovo za nekoliko minuta.' },
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const contactValidators = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Ime je obavezno.')
    .isString()
    .withMessage('Ime mora biti tekst.')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Ime mora imati između 2 i 100 znakova.'),
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('E-mail je obavezan.')
    .isString()
    .withMessage('E-mail mora biti tekst.')
    .trim()
    .isLength({ max: 254 })
    .withMessage('E-mail je predugačak.')
    .isEmail()
    .withMessage('Unesite valjanu e-mail adresu.'),
  body('message')
    .exists({ checkFalsy: true })
    .withMessage('Poruka je obavezna.')
    .isString()
    .withMessage('Poruka mora biti tekst.')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Poruka mora imati između 10 i 2000 znakova.'),
];

function handleContactValidation(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({
      errors: result.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
}

const router = Router();

router.post('/contact', contactRateLimiter, contactValidators, handleContactValidation, async (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const message = req.body.message.trim();

  if (process.env.NODE_ENV === 'test') {
    return res.status(201).json({ message: 'Poruka je poslana.' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_FROM || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ error: 'Greška pri slanju poruke. Pokušajte ponovo.' });
  }

  try {
    const port = Number(SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: SMTP_FROM,
      to: 'info@kontekst.hr',
      replyTo: email,
      subject: `Nova poruka s kontekst.hr — ${name.replace(/[\r\n]/g, ' ').slice(0, 80)}`,
      text: `Ime: ${name}\nE-mail: ${email}\n\nPoruka:\n${message}`,
      html: `<p><strong>Ime:</strong> ${safeName}</p><p><strong>E-mail:</strong> ${safeEmail}</p><p><strong>Poruka:</strong></p><p>${safeMessage.replace(/\n/g, '<br>')}</p>`,
    });

    return res.status(201).json({ message: 'Poruka je poslana.' });
  } catch {
    return res.status(500).json({ error: 'Greška pri slanju poruke. Pokušajte ponovo.' });
  }
});

export default router;
