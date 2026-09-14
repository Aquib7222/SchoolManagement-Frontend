import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ThemeContext = createContext();

const WHITE_COLOR_REGEX =
  /^(#fff|#ffffff|#fff[a-fA-F0-9]{0,2}|white|rgb\(255,\s*255,\s*255\)|rgba\(255,\s*255,\s*255,\s*(0|0?\.0+|1|1\.0+)\))$/i;

const DARK_BACKGROUND = "#1e293b";
const DARK_INPUT_BACKGROUND = "#172033";
const DARK_TEXT = "#f8fafc";
const DARK_BORDER = "#334155";

/**
 * Check whether a color is basically white.
 */
const isWhiteColor = (value) => {
  if (!value) return false;

  const normalized = value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  return WHITE_COLOR_REGEX.test(normalized);
};

/**
 * Save original inline styles before changing them.
 */
const saveOriginalStyle = (element, property) => {
  if (!element.dataset.themeOriginalStyles) {
    element.dataset.themeOriginalStyles = JSON.stringify({});
  }

  try {
    const originalStyles = JSON.parse(
      element.dataset.themeOriginalStyles
    );

    if (!(property in originalStyles)) {
      originalStyles[property] = element.style[property] || "";
      element.dataset.themeOriginalStyles =
        JSON.stringify(originalStyles);
    }
  } catch (error) {
    console.error("Theme style save error:", error);
  }
};

/**
 * Restore original inline styles.
 */
const restoreOriginalStyles = (element) => {
  if (!element.dataset.themeOriginalStyles) return;

  try {
    const originalStyles = JSON.parse(
      element.dataset.themeOriginalStyles
    );

    Object.entries(originalStyles).forEach(([property, value]) => {
      element.style[property] = value;
    });

    delete element.dataset.themeOriginalStyles;
  } catch (error) {
    console.error("Theme style restore error:", error);
  }
};

/**
 * Automatically convert inline white colors to dark colors.
 */
const applyInlineDarkMode = () => {
  const elements = document.querySelectorAll("*");

  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;

    const styles = window.getComputedStyle(element);

    /* Background */
    if (isWhiteColor(styles.backgroundColor)) {
      saveOriginalStyle(element, "backgroundColor");

      element.style.setProperty(
        "background-color",
        DARK_BACKGROUND,
        "important"
      );
    }

    /* Text */
    if (isWhiteColor(styles.color)) {
      saveOriginalStyle(element, "color");

      element.style.setProperty(
        "color",
        DARK_TEXT,
        "important"
      );
    }

    /* Border */
    if (isWhiteColor(styles.borderColor)) {
      saveOriginalStyle(element, "borderColor");

      element.style.setProperty(
        "border-color",
        DARK_BORDER,
        "important"
      );
    }
  });
};

/**
 * Restore inline styles after switching to light mode.
 */
const restoreInlineLightMode = () => {
  const elements = document.querySelectorAll("*");

  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;

    restoreOriginalStyles(element);
  });
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("zyntaks-theme") || "light";
  });

  const observerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("zyntaks-theme", theme);

    /* Stop previous observer */
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (theme === "dark") {
      /* Apply existing elements */
      requestAnimationFrame(() => {
        applyInlineDarkMode();
      });

      /**
       * Watch newly added React elements.
       *
       * This is important because React pages/components
       * are continuously mounted/unmounted.
       */
      observerRef.current = new MutationObserver(() => {
        applyInlineDarkMode();
      });

      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
      });
    } else {
      restoreInlineLightMode();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDarkMode: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};