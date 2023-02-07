import { render, screen,fireEvent,waitFor, getAllByRole } from '@testing-library/react';
import { App } from './App';

// this can be removed
test('renders home page', () => {
  render(<App />);
  const info = screen.getByText("Loading...wait for the response");
  expect(info).toBeInTheDocument();
});

test('Load and display logo', () => {
  render(<App />);
  const displayedImage = document.querySelector("img") as HTMLImageElement;  
  expect(displayedImage.src).toContain("simpplr.svg");
});

test('Load and display images from images.unsplash.com', async() => {
  render(<App />);
  await waitFor(() => screen.getByAltText('Palm tree'));
  const displayedImage = screen.getAllByRole("img" ) as HTMLImageElement[];
  expect(displayedImage[1].src).toContain("images.unsplash.com");
});

test('Image click', async() => {
  render(<App />);
  await waitFor(() => screen.getByAltText('Palm tree'));

  fireEvent.click(screen.getByAltText('Palm tree'))
  const info = screen.getByText("CVNt6d2Nw9s");
  expect(info).toBeInTheDocument();
});


