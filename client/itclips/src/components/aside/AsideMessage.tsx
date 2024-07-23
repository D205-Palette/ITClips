
interface MessageItem {
  id: number;
  title: string;
  subtitle: string;
  hasNotification?: boolean;
}

const MessageList = () => {

  // 더미 데이터
  const messages: MessageItem[] = [
    { id: 1, title: '고양친구', subtitle: '궁금한게 있습니다' },
    { id: 2, title: '고양친구의친구', subtitle: '누구세요??' },
    { id: 3, title: '고양친구, 고양양', subtitle: '감사합니다', hasNotification: true },
    { id: 4, title: '고양친구, 고양양', subtitle: '왕감사', hasNotification: true },
    { id: 5, title: '고양친구, 고양양', subtitle: '찐감사', hasNotification: true },
    { id: 6, title: '고양친구, 고양양', subtitle: '너무감사', hasNotification: true },
    { id: 7, title: '고양친구, 고양양', subtitle: '완전감사', hasNotification: true },
  ];

  return (
    <div className="bg-white p-4 max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">메세지</h2>
        <button className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      {/* 받은 메세지 영역 */}
      <div>
        <ul className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <li key={message.id} className="flex justify-between items-center bg-aside-layout rounded w-100 px-3 py-2">
              <div className="p-3">
                <h3 className="font-semibold text-start">{message.title}</h3>
                <p className="text-sm text-gray-500 text-start message-content">{message.subtitle}</p>
              </div>
              {message.hasNotification && (
                <span className="badge badge-sm badge-error m-5"></span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageList;