"user client"
// Store configuration
export interface StoreConfig {
    storeName: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    address: string;
    description: string;
    socialMedia: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
    };
    businessHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
}

// Default configuration
export const defaultConfig: StoreConfig = {
    storeName: "Mundo Eterno",
    email: "info@mundoeterno.com",
    phone: "+591 695 07260",
    whatsappNumber: "59169507260",
    address: "Av. Principal #123, Santa Cruz, Bolivia",
    description: "Tu destino para las flores más frescas y hermosas",
    socialMedia: {
        facebook: "https://facebook.com/mundoeterno",
        instagram: "https://instagram.com/mundoeterno",
        twitter: "https://twitter.com/mundoeterno",
    },
    businessHours: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Cerrado",
    },
};

// Get configuration from localStorage or use default
export function getConfig(): StoreConfig {
    if (typeof window === 'undefined') {
        return defaultConfig;
    }

    try {
        const stored = localStorage.getItem('storeConfig');
        if (stored) {
            return { ...defaultConfig, ...JSON.parse(stored) };
        }
    } catch (error) {
        console.error('Error loading config:', error);
    }

    return defaultConfig;
}

// Save configuration to localStorage
export function saveConfig(config: StoreConfig): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem('storeConfig', JSON.stringify(config));
    } catch (error) {
        console.error('Error saving config:', error);
    }
}
