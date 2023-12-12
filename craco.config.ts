import path from 'path';

const config = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, '/'),
      '@apis': path.resolve(__dirname, '/apis'),
      '@components': path.resolve(__dirname, '/components'),
      '@pages': path.resolve(__dirname, '/pages'),
      '@contexts': path.resolve(__dirname, '/contexts'),
      '@hooks': path.resolve(__dirname, '/hooks'),
      '@models': path.resolve(__dirname, '/models'),
      '@shared': path.resolve(__dirname, '/shared'),
      '@theme': path.resolve(__dirname, '/theme'),
      '@utils': path.resolve(__dirname, '/utils'),
      '@menu': path.resolve(__dirname, '/components/0 - Menu'),
      '@home': path.resolve(__dirname, '/components/1 - Home'),
      '@search-activity': path.resolve(__dirname, '/components/2 - Search Activity'),
      '@activity-details': path.resolve(__dirname, '/components/3 - Activity Details'),
      '@personal-area': path.resolve(__dirname, '/components/4 - Personal Area'),
      '@create-reservation': path.resolve(__dirname, '/components/5 - Create Reservation'),
      '@reservation-list': path.resolve(__dirname, '/components/6 - Reservation List'),
      '@reservation-details': path.resolve(__dirname, '/components/7 - Reservation Details'),
      '@search-user': path.resolve(__dirname, '/components/8 - Search User')
    },
  },
};

export default config;
