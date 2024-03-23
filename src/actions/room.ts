import axios from "axios";

export const getRoomById = async (id: string) => {
  // const response = await axios.get(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/room/${id}`
  // );

  const formattedData = {
    data: {
      id: "1",
      name: "room name",
      dealerId: "dealer1",
      eventId: "event1",
      ownId: "user1",
      min: 0,
      max: 100,
      status: "active",
      users: [
        {
          id: "user1",
          name: "user1",
          email: "user1@gmail.com",
          password: "123",
        },
        {
          id: "user2",
          name: "user2",
          email: "user2@gmail.com",
          password: "123",
        },
        {
          id: "user3",
          name: "user3",
          email: "user3@gmail.com",
          password: "123",
        },
      ],
      createdAt: "2001-02-01T00:00:00.000Z",
      updatedAt: "2024-03-19T10:39:58.141Z",
    },
    status: 200,
  };

  return formattedData.data;
};
