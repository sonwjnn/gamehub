import publicClient from '@/services/api/client/private-client'

const withdrawEndpoints = {
  getAllByBankId: (withdrawId: string) => `withdraws/bank/${withdrawId}`,
}

const withdrawApi = {
  getAllByBankId: async ({ bankId }: { bankId: string | undefined }) => {
    try {
      if (!bankId) return { response: [] }

      const response = await publicClient.get(
        withdrawEndpoints.getAllByBankId(bankId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default withdrawApi
