import ChatDisplay from "@/components/ChatDisplay";
import AuthCheck from '@/utils/AuthCheck'

export default function Home() {
  const user = AuthCheck();
  return <ChatDisplay />;
}
