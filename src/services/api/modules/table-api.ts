import publicClient from '@/services/api/client/private-client'

const tableEndpoints = {
  getTableById: ({ tableId }: { tableId: string }) => `tables/${tableId}`,
  getTables: ({ page }: { page: string }) => `tables?page=${page}`,
}

const tableApi = {
  getTableById: async (data: { tableId: string }) => {
    try {
      const response = await publicClient.get(tableEndpoints.getTableById(data))
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
  getTables: async ({ page }: { page: string }) => {
    try {
      console.log(page)
      const response = await publicClient.get(
        tableEndpoints.getTables({ page })
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default tableApi
