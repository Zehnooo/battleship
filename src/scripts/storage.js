const PREFIX = 'battleship_';

export const storage = {
    set(key, value) {
        try {
            window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
        } catch (err) {
            console.error(`Error setting localStorage key ${key}: `, err);
        }
    },
    get(key) {
        try {
            const item = window.localStorage.getItem(`${PREFIX}${key}`);
            return item ? JSON.parse(item) : null;
        } catch (err) {
            console.error(`Error finding localStorage value with ${key}: `, err);
            return null;
        }
    },
    remove(key) {
        try {
            window.localStorage.removeItem(`${PREFIX}${key}`);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    },
}