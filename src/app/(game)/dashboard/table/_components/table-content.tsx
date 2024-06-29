'use client'

import { Player, PokerActions, TableWithPlayers } from '@/types'
import { TableList } from './list'
import Pagination from './pagination'
import { useSocket } from '@/providers/socket-provider'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useCustomToast } from '@/hooks/use-custom-toast'

interface TableContentProps {
  tables: TableWithPlayers[]
  pageCount: number
}

export const TableContent = ({ tables, pageCount }: TableContentProps) => {
  const [tableList, setTableList] = useState<TableWithPlayers[]>(tables)
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    socket.on(
      PokerActions.LEAVE_TABLE,
      ({ tableId, playerId }: { tableId: string; playerId: string }) => {
        setTableList(prev =>
          prev.map(table => {
            if (table.id === tableId) {
              return {
                ...table,
                players: table.players.filter(player => player.id !== playerId),
              }
            }
            return table
          })
        )
      }
    )
    socket.on(
      PokerActions.JOIN_TABLE,
      ({ tableId, player }: { tableId: string; player: Player }) => {
        setTableList(prev =>
          prev.map(table => {
            if (table.id === tableId) {
              return {
                ...table,
                players: [...table.players, player],
              }
            }
            return table
          })
        )
      }
    )

    return () => {
      socket.off(PokerActions.LEAVE_TABLE)
      socket.off(PokerActions.JOIN_TABLE)
    }
  }, [socket])

  return (
    <div className="content_main">
      <div className="inner">
        <div className="form_custom form_room w-full ">
          <h2 className="ttl_main fz-18">
            <span>
              <strong className="icon sz-24 icon-color-white flex-shrink">
                <i className="icon-room"></i>
              </strong>
              테이블
            </span>
          </h2>

          <div className="row flex flex-center gapy-40">
            <svg>
              <filter id="noiseFilter2">
                <feturbulence
                  type="fractalNoise"
                  baseFrequency="0.6"
                  stitchTiles="stitch"
                ></feturbulence>
              </filter>
              <clipPath id="rounded-clip">
                <rect
                  x="0"
                  y="0"
                  width="300"
                  height="300"
                  rx="20"
                  ry="20"
                ></rect>
              </clipPath>
            </svg>
            <div className="col-12 col-md-8">
              <TableList tables={tableList} />

              {pageCount > 1 && <Pagination pageCount={pageCount} />}
            </div>
            <div className="col-12 col-md-4 py-8">
              <div className="room room_event">
                <p className="text-center">출시 예정</p>
                <br />
                <span className="fz-14">축제방</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
