/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    container: {
      center: true, // Center the container by default
      padding: "5rem", // Adjust container padding if necessary
    },
    extend: {
      colors: {
        "primary-1": "#C69E73",
        "primary-2": "#E9D9C9",
        "bg-primary-1": "#C69E73",
        "bg-primary-2": "#E9D9C9",
        "bg-red-2": "#E50930",
        "red-2": "#E50930",
      },
    },
  },

  plugins: [],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  // plugins: [require("tailwindcss-primeui")],
};
