import { api } from "./api";

interface FriendRequestPayload {
	nick: string;
}

interface FriendResponsePayload {
	nick: string;
	action: 'accept' | 'decline';
}

export const friendsService = {
	listFriends: () =>
		api.get("/friends/list"),

	getUserById: (id: string | number) =>
		api.get(`/friends/users/${id}`),

	sendFriendRequest: (data: FriendRequestPayload) =>
		api.post("/friends/request", data),

	respondFriendRequest: (data: FriendResponsePayload) =>
		api.post("/friends/response", data),

	removeFriend: (id: string | number) =>
		api.delete(`/friends/remove/${id}`),
};
