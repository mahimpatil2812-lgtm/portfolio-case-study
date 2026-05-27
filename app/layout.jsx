export const metadata = {
  title: "Portfolio Case Study",
  description: "Corporate Banking UX Case Study",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}