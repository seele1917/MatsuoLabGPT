import { v4 as uuidv4 } from "uuid";
import { Message } from "./Message";
import { Chat } from "./Chat";
import { getChatById, updateChatMessages } from "./utils";
import { NextRouter } from "next/router";
import { APIState, ChatState, useChatStore } from "./ChatStore";
import { submitMessage } from "./SubmitMessage";
import { fetchModels } from "./OpenAI";
import axios from "axios";

const get = useChatStore.getState;
const set = useChatStore.setState;

export const update = (newState: Partial<ChatState>) => set(() => newState);

export const clearChats = () => set(() => ({ chats: [] }));

export const deleteChat = (id: string) =>
  set((state) => ({
    chats: state.chats.filter((chat) => chat.id !== id),
  }));

export const addChat = (router: NextRouter) => {
  const id = uuidv4();

  set((state) => ({
    activeChatId: id,
    chats: [
      ...state.chats,
      {
        id,
        title: undefined,
        messages: [],
        createdAt: new Date(),
      },
    ],
  }));
  router.push(`/chat/${id}`);
};

export const setActiveChatId = (id: string | undefined) =>
  set(() => ({ activeChatId: id }));

export const updateMessage = (message: Message) => {
  const chat = getChatById(get().chats, get().activeChatId);
  if (chat === undefined) {
    console.error("Chat not found");
    return;
  }
  set((state) => ({
    chats: updateChatMessages(state.chats, chat.id, (messages) => {
      return messages.map((m) => (m.id === message.id ? message : m));
    }),
  }));
};

export const pushMessage = (message: Message) => {
  const chat = getChatById(get().chats, get().activeChatId);
  if (chat === undefined) {
    console.error("Chat not found");
    return;
  }
  set((state) => ({
    chats: updateChatMessages(state.chats, chat.id, (messages) => {
      return [...messages, message];
    }),
  }));
};

export const delMessage = (message: Message) => {
  const chat = getChatById(get().chats, get().activeChatId);
  if (chat === undefined) {
    console.error("Chat not found");
    return;
  }
  set((state) => ({
    chats: updateChatMessages(state.chats, chat.id, (messages) => {
      return messages.filter((m) => m.id !== message.id);
    }),
  }));
};

export const setColorScheme = (scheme: "light" | "dark") =>
  set((state) => ({ colorScheme: scheme }));

export const setApiKey = (key: string) => set((state) => ({ apiKey: key }));

export const setApiKey11Labs = (key: string) =>
  set((state) => ({ apiKey11Labs: key }));

export const setApiState = (apiState: APIState) =>
  set((state) => ({ apiState }));

export const updateSettingsForm = (settingsForm: ChatState["settingsForm"]) =>
  set((state) => ({ settingsForm }));

export const updateChat = (options: Partial<Chat>) =>
  set((state) => ({
    chats: state.chats.map((c) => {
      if (c.id === options.id) {
        return { ...c, ...options };
      }
      return c;
    }),
  }));

export const setChosenCharacter = (name: string) =>
  set((state) => ({
    chats: state.chats.map((c) => {
      if (c.id === state.activeChatId) {
        c.chosenCharacter = name;
      }
      return c;
    }),
  }));

export const setNavOpened = (navOpened: boolean) =>
  set((state) => ({ navOpened }));

export const setPushToTalkMode = (pushToTalkMode: boolean) =>
  set((state) => ({ pushToTalkMode }));

export const setPlayerMode = (playerMode: boolean) => {
  set((state) => ({ playerMode }));
};

export const setEditingMessage = (editingMessage: Message | undefined) =>
  set((state) => ({ editingMessage }));

export const regenerateAssistantMessage = (message: Message) => {
  const chat = getChatById(get().chats, get().activeChatId);
  if (chat === undefined) {
    console.error("Chat not found");
    return;
  }

  // If this is an existing message, remove all the messages after it
  const index = chat.messages.findIndex((m) => m.id === message.id);

  const prevMsg = chat.messages[index - 1];
  if (prevMsg) {
    submitMessage(prevMsg);
  }
};

export const refreshModels = async () => {
  const { apiKey } = get();
  // Load OpenAI models
  if (!apiKey) return;

  try {
    const modelIDs = await fetchModels(apiKey);
    // Use only models that start with gpt-3.5 or gpt-4
    update({
      modelChoicesChat: modelIDs.filter(
        (id) => id.startsWith("gpt-3.5") || id.startsWith("gpt-4")
      ),
    });
  } catch (error) {
    console.error("Failed to fetch models:", error);
  }
};

// User
export const setUserId = (userId: string) => set((state) => ({ userId: userId }));
export const setJwtToken = (token: string) => set((state) => ({ jwttoken: token }));
export const clearUser = () => set((state) => ({ userId: undefined, jwttoken: undefined }));

// Character
export const addCharacter = async (character: any) => {
  const { userId } = get();
  try {
    const res = await axios.post("/api/character/add", {
      userId: userId,
      name: character.name,
      shortDescription: character.shortDescription,
      avatar: character.avatar,
      prompt: character.prompt,
    });
    // const key = String(Object.keys(get().characters).length + 1)
    // set((state) => ({ characters: { [key]: character, ...state.characters } }));
  } catch (error) {
    console.error("Failed to add character:", error);
  }
}

export const setCharacters = (characters: any) => {
  set((state) => ({ characters }));
};

export const getCharacters = async () => {
  try {
    const res = await axios.post("/api/character/get", {
      userId: process.env.NEXT_PUBLIC_ADMIN_USER_ID,
    });
    return res.data.characters;
  } catch (error) {
    console.error("Failed to get characters:", error);
  }
}

export const delCharacter = async (key: string, id: string) => {
  try {
    const res = await axios.post("/api/character/del", {
      id: id
    });
    set((state) => {
      const { [key]: _, ...rest }: any = state.characters;
      return { characters: rest };
    });
  } catch (error) {
    console.error("Failed to delete characters:", error);
  }
}