import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Contact from './Contact.jsx';

describe('Contact', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('renderira sekciju i naslov', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#kontakt')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Pokrenimo razgovor o automatizaciji/i })).toBeInTheDocument();
  });

  it('prazan submit prikazuje validacijske poruke i ne zove fetch', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const form = screen.getByTestId('kontakt-form');

    await user.click(within(form).getByRole('button', { name: /Pošalji upit/i }));

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.getByText('Ime mora imati najmanje 2 znaka.')).toBeInTheDocument();
    expect(screen.getByText('E-mail je obavezan.')).toBeInTheDocument();
    expect(screen.getByText('Poruka mora imati najmanje 10 znakova.')).toBeInTheDocument();
  });

  it('valjani podaci šalju POST s ispravnim JSON tijelom', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({}),
    });

    render(<Contact />);
    const form = screen.getByTestId('kontakt-form');

    await user.type(within(form).getByLabelText(/Ime i prezime/i), 'Ivo Horvat');
    await user.type(within(form).getByLabelText(/^E-mail$/i), 'ivo@primjer.hr');
    await user.type(within(form).getByLabelText(/^Poruka$/i), 'Želim automatizirati narudžbe.');
    await user.click(within(form).getByRole('button', { name: /Pošalji upit/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe('http://localhost:3000/api/contact');
    expect(init.method).toBe('POST');
    expect(init.headers).toMatchObject({ 'Content-Type': 'application/json' });
    expect(JSON.parse(init.body)).toEqual({
      name: 'Ivo Horvat',
      email: 'ivo@primjer.hr',
      message: 'Želim automatizirati narudžbe.',
    });
  });

  it('status 201 prikazuje poruku uspjeha', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({}),
    });

    render(<Contact />);
    const form = screen.getByTestId('kontakt-form');

    await user.type(within(form).getByLabelText(/Ime i prezime/i), 'Ana Anić');
    await user.type(within(form).getByLabelText(/^E-mail$/i), 'ana@primjer.hr');
    await user.type(within(form).getByLabelText(/^Poruka$/i), 'Pitanje o n8n integraciji.');
    await user.click(within(form).getByRole('button', { name: /Pošalji upit/i }));

    await waitFor(() => {
      expect(screen.getByText('Hvala! Javit ćemo vam se uskoro.')).toBeInTheDocument();
    });
  });
});
