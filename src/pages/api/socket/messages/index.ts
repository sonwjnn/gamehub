import { NextApiResponseServerIo } from '@/types'
import { NextApiRequest } from 'next'
import tableApi from '@/services/api/modules/table-api'
import playerApi from '@/services/api/modules/player-api'
import messsageApi from '@/services/api/modules/message-api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { content, user } = req.body
    const { tableId } = req.query

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!tableId) {
      return res.status(400).json({ error: 'Channel ID missing' })
    }

    if (!content) {
      return res.status(400).json({ error: 'Content missing' })
    }

    const { response: table } = await tableApi.getTableById({
      tableId: tableId as string,
    })

    if (!table) {
      return res.status(404).json({ message: 'table not found' })
    }

    const { response: currentPlayer } = await playerApi.getCurrentPlayerOfTable(
      {
        tableId: tableId as string,
        userId: user.id,
      }
    )

    if (!currentPlayer) {
      return res
        .status(404)
        .json({ message: 'Current player of table not found' })
    }

    const message = await messsageApi.createMessage({
      content,
      playerId: currentPlayer.id,
      deleted: false,
      createdAt: new Date(),
    })

    const tableKey = `chat:${tableId}:messages`

    res?.socket?.server?.io?.emit(tableKey, message)

    return res.status(200).json(message)
  } catch (error) {
    console.log('[MESSAGES_POST]', error)
    return res.status(500).json({ message: 'Internal Error' })
  }
}
