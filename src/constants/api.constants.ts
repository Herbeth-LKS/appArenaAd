export const ApiReportRoutes = {
  get: (GUID: string) => {
    return `${process.env.EXPO_PUBLIC_API_URL}relatorios/${GUID}`
  },
}
