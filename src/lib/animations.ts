export const transition = {
    type: 'spring',
    stiffness: 50,
    damping: 20,
    mass: 1.2,
} as const;

export const quickTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
} as const;

export const fadeUp = {
    initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition,
    },
    exit: { opacity: 0, y: -20, transition },
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition },
    exit: { opacity: 0, transition },
};

export const scaleUp = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition,
    },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const magneticSpring = {
    type: 'spring',
    stiffness: 150,
    damping: 15,
    mass: 0.1,
};
