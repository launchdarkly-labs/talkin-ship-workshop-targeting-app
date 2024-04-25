/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1536px",
        "3xl": "2500px",
      },
    },
    extend: {
      width: {
        '80': '80%', // Add this line
      },
      height: {
        '80': '80%', // Add this line
      },
      screens: {
        "3xl": "2500px",
      },
      height: {
        "screen-20": "calc(100vh - 5rem)", // 5rem is equivalent to 20 in Tailwind's spacing scale
      },
      backgroundImage: (theme) => ({
        "gradient-radial":
          "radial-gradient(ellipse at center, #00c0e7 0%, #a34fde 100%)",
        "gradient-releases":          
        "linear-gradient(224.68deg, #405BFF -5.3%, #3DD6F5 112.86%)",

        "gradient-blue":
        "linear-gradient(224.68deg, #405BFF -5.3%, #3DD6F5 112.86%)",

        "gradient-targeting":
          "linear-gradient(224.68deg, #405BFF -5.3%, #3DD6F5 112.86%)",
        "gradient-mobile": "linear-gradient(65deg,#ff386b 3.6%,#ffaf38 98.81%)",
        "gradient-airways":
          "linear-gradient(224.68deg, #405BFF -5.3%, #3DD6F5 112.86%)",
        "airlinegradient2":"linear-gradient(200.65deg, #58595B -25.37%, #212121 75.5%)",
        "airlinegradient3":"linear-gradient(223.42deg, #FF386B -1.29%, #A34FDE 110.16%)",
        card4bottom:
        "linear-gradient(224.68deg, #405BFF -5.3%, #3DD6F5 112.86%)",

        
      }),
      fontFamily: {
        sohne: ["Sohne"],
        sohnemono: ["Sohne Mono"],
        sohnelight: ["Sohne Light"],
        audimat: ["Audimat"],
        roboto: ["Roboto"],
        robotobold: ["Roboto-Bold"],
        robotolight: ["Roboto-Light"],
        robotothin: ["Roboto-Thin"],
        audimat: ["Audimat"],
        sohnelight: ["Sohne Light"],
      },
      colors: {
        border: "hsl(var(--border))",
        bluegradient: "linear-gradient(224.68deg, #405BFF -5.3%, #3DD6F5 112.86%)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ldblack: "#191919",
        ldgrey: "#282828",
        ldcardgrey: "#E6E6E6",
        ldlightgray: "#939598",
        ldstoreheader: "#D1D3D4",
        awsorange: "#FF9900",
        navgray: "#282828",
        airlinetext: "#D1D3D4",
        airlineinactive: "#939598",
        airlinedarkblue: "#405BFF",
        airlinelightblue: "#3DD6F5",
        airlineBlack: "#2C2C2C",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
