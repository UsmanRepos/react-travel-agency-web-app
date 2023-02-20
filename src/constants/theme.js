
export const COLORS = {
    // primary: "#051630", // Dark Blue
    primary: '#009387', // greenish
    sceondary: "#FFC664", // Dark Yellow
    // primary: "#33354E", // Dark Blue
    // sceondary: "#F1CD7C",  // Yellow 
  

    gray10: "#E5E5E5",
    gray20: "#CCCCCC",
    gray30: "#A1A1A1",
    gray40: "#999999",
    gray50: "#7F7F7F",
    gray60: "#666666",
    gray70: "#4C4C4C",
    gray80: "#333333",
    gray85: "#242526",
    gray90: "#191919",

    additionalColor4: "#C3C3C3",
    additionalColor9: "#F3F3F3",
    additionalColor11: "#F0FFFB",
    additionalColor13: "#EBF3EF",

    white: '#FFFFFF',
    black: '#000000',

    lime: "#00BA63",
    emerald: "#2BC978",
    lightRed: "#FFF1F0",

    purple: "#6B3CE9",
    lightpurple: "#F3EFFF",

    yellow: "#FFC664",
    lightyellow: "#FFF9EC",

    transparentWhite4: 'rgba(255, 255, 255, 0.4)',
    transparentBlack4: 'rgba(0, 0, 0, 0.4)',
    transparentWhite8: 'rgba(255, 255, 255, 0.8)',
    transparentBlack8: 'rgba(0, 0, 0, 0.8)',
    transparent: 'transparent',
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12
    
};

export const FONTS = {
    largeTitle: { fontFamily: "Poppins-Black", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "Poppins-Bold", fontSize: SIZES.h1 },
    h2: { fontFamily: "Poppins-Bold", fontSize: SIZES.h2},
    h3: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h3 },
    h4: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h4 },
    h5: { fontFamily: "Poppins-SemiBold", fontSize: SIZES.h5 },
    body1: { fontFamily: "Poppins-Regular", fontSize: SIZES.body1 },
    body2: { fontFamily: "Poppins-Regular", fontSize: SIZES.body2 },
    body3: { fontFamily: "Poppins-Regular", fontSize: SIZES.body3 },
    body4: { fontFamily: "Poppins-Regular", fontSize: SIZES.body4 },
    body5: { fontFamily: "Poppins-Regular", fontSize: SIZES.body5 },
};

const appTheme = { COLORS, SIZES, FONTS};

export default appTheme;