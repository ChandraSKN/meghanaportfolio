import './globals.css';
import BubbleNav from './components/BubbleNav';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blush text-charcoal">
        <BubbleNav />
        {children}
      </body>
    </html>
  );
}
