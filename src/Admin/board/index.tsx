import HeaderBoard from "./HeaderBoard";

const Board = () => {
    return (
        <div className="flex w-100% flex-col bg-slate-400">
            <HeaderBoard/>
            <div style={{ height: '9000px' }} >
                This div has a height of 100px.
            </div>
        </div>
    );
}

export default Board;