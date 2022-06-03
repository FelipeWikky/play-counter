import { RFPercentage } from 'react-native-responsive-fontsize';
export const THEME = {
    TYPE: "default",
    COLORS: {
        BACKGROUND: 'rgba(250, 250, 250, 1)', // white
        // BACKGROUND: 'rgba(237, 245, 251, 1)', // white
        PRIMARY: 'rgba(48, 140, 219, 1)', // blue
        SECONDARY: 'rgba(70, 88, 105, 1)', // dark grey

        LABEL: 'rgba(48, 140, 219, 1)',
        TEXT: 'rgba(70, 88, 105, 1)',
        TEXT_LOW: 'rgba(70, 88, 105, 0.5)',
        
        ERROR: 'rgba(217, 45, 32, 1)',
        ERROR_INPUT_BORDER: 'rgba(217, 45, 32, 0.5)',

        BORDER: 'rgba(156, 166, 175, 1)',
        BORDER_LOW: 'rgba(156, 166, 175, 0.5)',
        BORDER_VERY_LOW: 'rgba(156, 166, 175, 0.3)',

        DEFAULT: 'rgba(48, 140, 219, 1)',
        DEFAULT_DISABLE: 'rgba(48, 140, 219, 0.5)',

        SUCCESS: 'rgba(50, 213, 131, 1)',
        SUCCESS_DISABLE: 'rgba(50, 213, 131, 0.5)',

        DANGER: 'rgba(240, 68, 56, 1)',
        DANGER_DISABLE: 'rgba(240, 68, 56, 0.5)',

        WHITE: 'rgba(237, 245, 251, 1)',
        
        OVERLAY: "rgba(255, 255, 255, .6)",
        OVERLAY_LIGHT: "rgba(255, 255, 255, .6)",
        OVERLAY_DARK: "rgba(0, 0, 0, .6)",

    },

    SIZE: {
        /**
         * Xtreme large (sl)
         */
        TITLE_MAIN: RFPercentage(4),
        /**
        * Large (lg)
        */
        TITLE: RFPercentage(3.5),
        /**
         * Greater than medium and less than large (sl)
         */
        SUB_TITLE: RFPercentage(3),
        /**
         * Medium (md)
         */
        NORMAL: RFPercentage(2.5),
        /**
        * Normal small (ns)
        */
        NORMAL_SMALL: RFPercentage(2),
        /**
        * Small (sm)
        */
        SMALL: RFPercentage(1.5),

        /**
         * Xtreme small (xs)
         */
        VERY_SMALL: RFPercentage(1),
    },

    FONTS: {
        REGULAR: 'Roboto_400Regular',
        MEDIUM: 'Roboto_500Medium',
        BOLD: 'Roboto_700Bold'
    },

    SHADOW: {
        0: "rgba(0, 0, 0, 0)",
        1: "rgba(0, 0, 0, .1)",
        2: "rgba(0, 0, 0, .2)",
        3: "rgba(0, 0, 0, .3)",
        4: "rgba(0, 0, 0, .4)",
        5: "rgba(0, 0, 0, .5)",
        6: "rgba(0, 0, 0, .6)",
        7: "rgba(0, 0, 0, .7)",
        8: "rgba(0, 0, 0, .8)",
        9: "rgba(0, 0, 0, .9)",
        10: "rgba(0, 0, 0, 1)",
    }
}