import { Outlet } from 'react-router-dom';

export default function ParentNav() {
    return (
        <>
            <p>Nav...</p>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
