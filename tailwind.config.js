/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        sm: "500",
        md: "750px",
        lg: "975px",
        xl: "1250px",
      },
    },
  },
  plugins: [],
};
