interface IResponse {
  error?: string
}

// Hàm emitEvent
export function emitEvent(
  socket: any,
  event: string,
  data: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    socket.emit(event, data, (response: IResponse) => {
      // Nếu có lỗi từ server, chúng ta sẽ reject Promise
      if (response.error) {
        reject(response.error)
      } else {
        resolve()
      }
    })
  })
}
