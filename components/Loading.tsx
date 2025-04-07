
export default function Loading() {

    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <svg className="animate-bounce h-10 w-10 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-3h11a2.5 2.5 0 0 1 0 5h-11a2.5 2.5 0 0 1 0-5z"></path>
                <path className="opacity-75" fill="currentColor" d="M12 4a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm0-2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"></path>
            </svg>
            <span className="text-gray-500">Carregando</span>
        </div>)

}