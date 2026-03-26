import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Questionnaire from './Questionnaire.jsx';

// window.scrollTo is not available in jsdom
beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn());
  vi.stubGlobal('fetch', vi.fn());
});

describe('Questionnaire (HR)', () => {
  it('renders intro screen with H1 and start button', () => {
    render(<Questionnaire />);

    expect(
      screen.getByRole('heading', { name: /Koliko je vaše poslovanje spremno za AI/i })
    ).toBeInTheDocument();

    // First question card should be visible immediately (no intro splash per UX spec)
    expect(screen.getByTestId('question-text')).toHaveTextContent('Koliko često vaš tim radi iste zadatke iznova?');

    // Progress indicator should show question 1 of 5
    expect(screen.getByText('Pitanje 1 od 5')).toBeInTheDocument();
  });

  it('advances to step 2 after selecting an answer and clicking Next', async () => {
    const user = userEvent.setup();
    render(<Questionnaire />);

    // Select answer 'a' for Q1
    const radioA = screen.getByTestId('answer-q1-a');
    await user.click(radioA);

    const nextBtn = screen.getByTestId('next-button');
    await user.click(nextBtn);

    // Should now show Q2
    expect(screen.getByTestId('question-text')).toHaveTextContent('Kako biste opisali vaše poslovne procese?');
    expect(screen.getByText('Pitanje 2 od 5')).toBeInTheDocument();
  });

  it('Next button is disabled until an answer is selected', () => {
    render(<Questionnaire />);

    const nextBtn = screen.getByTestId('next-button');
    expect(nextBtn).toBeDisabled();
  });

  it('Next button becomes enabled after answer is selected', async () => {
    const user = userEvent.setup();
    render(<Questionnaire />);

    const nextBtn = screen.getByTestId('next-button');
    expect(nextBtn).toBeDisabled();

    await user.click(screen.getByTestId('answer-q1-b'));
    expect(nextBtn).not.toBeDisabled();
  });

  it('can navigate forward and back, preserving answers', async () => {
    const user = userEvent.setup();
    render(<Questionnaire />);

    // Select answer b for Q1 and go forward
    await user.click(screen.getByTestId('answer-q1-b'));
    await user.click(screen.getByTestId('next-button'));

    // Now on Q2 — back button should exist
    expect(screen.getByTestId('question-text')).toHaveTextContent('Kako biste opisali vaše poslovne procese?');

    // Navigate back to Q1
    await user.click(screen.getByTestId('back-button'));

    // Should be back on Q1 with answer b still selected
    expect(screen.getByTestId('question-text')).toHaveTextContent('Koliko često vaš tim radi iste zadatke iznova?');
    const radioB = screen.getByTestId('answer-q1-b');
    expect(radioB).toBeChecked();
  });

  it('Back button is not shown on question 1', () => {
    render(<Questionnaire />);
    expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
  });

  it('shows "Prikaži moje rezultate" on final question', async () => {
    const user = userEvent.setup();
    render(<Questionnaire />);

    // Navigate to question 5
    for (let i = 1; i <= 4; i++) {
      await user.click(screen.getByTestId(`answer-q${i}-a`));
      await user.click(screen.getByTestId('next-button'));
    }

    expect(screen.getByText('Pitanje 5 od 5')).toBeInTheDocument();
    await user.click(screen.getByTestId('answer-q5-a'));
    expect(screen.getByTestId('next-button')).toHaveTextContent('Prikaži moje rezultate');
  });

  it('submits with correct POST body on final step and shows loading state', async () => {
    const user = userEvent.setup();

    // Mock fetch to return a pending promise so we can check loading state
    let resolveFetch;
    fetch.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );

    render(<Questionnaire />);

    // Complete all 5 questions
    const answerKeys = ['a', 'b', 'c', 'a', 'b'];
    for (let i = 1; i <= 5; i++) {
      await user.click(screen.getByTestId(`answer-q${i}-${answerKeys[i - 1]}`));
      if (i < 5) {
        await user.click(screen.getByTestId('next-button'));
      }
    }

    await user.click(screen.getByTestId('next-button'));

    // Verify fetch was called with correct payload
    expect(fetch).toHaveBeenCalledOnce();
    const [url, options] = fetch.mock.calls[0];
    expect(url).toContain('/api/questionnaire');
    expect(options.method).toBe('POST');

    const body = JSON.parse(options.body);
    expect(body.locale).toBe('hr');
    expect(body.answers).toHaveLength(5);
    expect(body.answers.find((a) => a.questionId === 'q1')?.value).toBe('a');
    expect(body.answers.find((a) => a.questionId === 'q2')?.value).toBe('b');
    expect(body.answers.find((a) => a.questionId === 'q3')?.value).toBe('c');
    expect(body.answers.find((a) => a.questionId === 'q4')?.value).toBe('a');
    expect(body.answers.find((a) => a.questionId === 'q5')?.value).toBe('b');

    // Loading state should be visible
    expect(screen.getByText('Analiziramo vaše odgovore…')).toBeInTheDocument();

    // Resolve fetch to clean up
    resolveFetch({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ tier: 'Graditelj', score: 5, assessment: 'Test.' }),
    });
  });

  it('shows result card on successful API response', async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          tier: 'Graditelj',
          score: 7,
          assessment: 'Vaše poslovanje je na dobrom putu.',
        }),
    });

    render(<Questionnaire />);

    for (let i = 1; i <= 5; i++) {
      await user.click(screen.getByTestId(`answer-q${i}-b`));
      if (i < 5) {
        await user.click(screen.getByTestId('next-button'));
      }
    }
    await user.click(screen.getByTestId('next-button'));

    await waitFor(() => {
      expect(screen.getByText('7')).toBeInTheDocument();
    });

    expect(screen.getByText('Graditelj')).toBeInTheDocument();
    expect(screen.getByText('Na pravom ste putu — i bliže ste nego mislite.')).toBeInTheDocument();
    expect(screen.getByText('Vaše poslovanje je na dobrom putu.')).toBeInTheDocument();
  });

  it('shows rate limit error on 429 response', async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValue({
      ok: false,
      status: 429,
      json: () => Promise.resolve({}),
    });

    render(<Questionnaire />);

    for (let i = 1; i <= 5; i++) {
      await user.click(screen.getByTestId(`answer-q${i}-a`));
      if (i < 5) {
        await user.click(screen.getByTestId('next-button'));
      }
    }
    await user.click(screen.getByTestId('next-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-card')).toBeInTheDocument();
    });

    expect(screen.getByText('Previše pokušaja.')).toBeInTheDocument();
    expect(screen.getByText(/Pričekajte 15 minuta/i)).toBeInTheDocument();
    // No retry button on rate limit
    expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
  });

  it('shows generic error on 500 response', async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    render(<Questionnaire />);

    for (let i = 1; i <= 5; i++) {
      await user.click(screen.getByTestId(`answer-q${i}-c`));
      if (i < 5) {
        await user.click(screen.getByTestId('next-button'));
      }
    }
    await user.click(screen.getByTestId('next-button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-card')).toBeInTheDocument();
    });

    expect(screen.getByText('Nešto je pošlo po krivu.')).toBeInTheDocument();
    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
  });

  it('retry button on generic error returns to Q5 with answers retained', async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    render(<Questionnaire />);

    for (let i = 1; i <= 5; i++) {
      await user.click(screen.getByTestId(`answer-q${i}-c`));
      if (i < 5) {
        await user.click(screen.getByTestId('next-button'));
      }
    }
    await user.click(screen.getByTestId('next-button'));

    await waitFor(() => {
      expect(screen.getByTestId('retry-button')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('retry-button'));

    // Should be back on Q5 with answer still selected
    expect(screen.getByTestId('question-text')).toHaveTextContent('Kada biste bili spremni za prvi projekt?');
    expect(screen.getByTestId('answer-q5-c')).toBeChecked();
  });

  it('reset button returns to Q1 and clears all state', async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({ tier: 'Istraživač', score: 2, assessment: 'Samo istraživanje.' }),
    });

    render(<Questionnaire />);

    for (let i = 1; i <= 5; i++) {
      await user.click(screen.getByTestId(`answer-q${i}-a`));
      if (i < 5) {
        await user.click(screen.getByTestId('next-button'));
      }
    }
    await user.click(screen.getByTestId('next-button'));

    await waitFor(() => {
      expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('reset-button'));

    // Back on Q1 with no answer selected
    expect(screen.getByTestId('question-text')).toHaveTextContent('Koliko često vaš tim radi iste zadatke iznova?');
    expect(screen.getByText('Pitanje 1 od 5')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeDisabled();
  });
});
