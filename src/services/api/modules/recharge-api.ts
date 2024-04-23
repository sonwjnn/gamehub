import publicClient from '@/services/api/client/private-client'

const rechargeEndpoints = {
  getAllByBankId: (rechargeId: string) => `recharges/bank/${rechargeId}`,
}

const rechargeApi = {
  getAllByBankId: async ({ bankId }: { bankId: string | undefined }) => {
    try {
      if (!bankId) return { response: [] }

      const response = await publicClient.get(
        rechargeEndpoints.getAllByBankId(bankId)
      )
      if (response && response.data) return { response: response.data }
      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default rechargeApi
