const MOCK_FILE_URL =
  "https://ifo1en01uy.ufs.sh/f/w5RpO7yXSqpzIlz8gN4OLcHZ9rwzEtIh1eaDVPy6fMBxvYJR";

export const MOCK_UTAPI = {
  uploadFiles: async () => ({
    error: null,
    data: {
      ufsUrl: MOCK_FILE_URL,
    },
  }),
  deleteFiles: async () => {},
};
