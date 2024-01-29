import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import ParentNav from "../components/ParentNav.jsx";
import ParentMain from "../views/ParentMain.jsx";
import ParentJob from "../views/ParentJob.jsx";
import ParentFundSaving from "../views/ParentFundSaving.jsx";
import ChildNav from "../components/ChildNav.jsx";
import ChildMainManagement from "../views/ChildMainManagement.jsx";
import ChildMainStatement from "../views/ChildMainStateMent.jsx";
import ChildFundManagement from "../views/ChildFundManagement.jsx";
import ChildFundStatement from "../views/ChildFundStatement.jsx";
import ChildSavingManagement from "../views/ChildSavingManagement.jsx";
import ChildSavingStatement from "../views/ChildSavingStatement.jsx";
import ChildEducation from "../views/ChildEducation.jsx";
import Welcome from "../views/Welcome.jsx";
import Profile from "../views/Profile.jsx";

/*
    로그인 여부에 따라 달라져야...
    로그인 되어있으면 해당 프로필의 메인페이지로
    로그인 되어있지 않으면 환영 페이지로

    각 유저에 따라 페이지 렌더링이 동적 렌더링 되어야... -> {users}/parent...로?
    아니면 부모는 아이페이지 권한을 막는 식으로?
*/

const isLoggedIn = false; // 로그인 여부에 따라 조건 설정

const router = createBrowserRouter([
  {
    path: "/",
    element: isLoggedIn ? <Navigate to="/parent" /> : <Welcome />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/parent",
    element: <ParentNav />,
    children: [
      {
        path: "/parent",
        element: <ParentMain />,
      },
      {
        path: "/parent/main",
        element: <ParentMain />,
      },
      {
        path: "/parent/job",
        element: <ParentJob />,
      },
      {
        path: "/parent/fundsaving",
        element: <ParentFundSaving />,
      },
    ],
  },
  {
    path: "/child",
    element: <ChildNav />,
    children: [
      {
        path: "/child",
        element: <ChildMainManagement />,
      },
      {
        path: "/child/main/management",
        element: <ChildMainManagement />,
      },
      {
        path: "/child/main/statement",
        element: <ChildMainStatement />,
      },
      {
        path: "/child/fund/management",
        element: <ChildFundManagement />,
      },
      {
        path: "/child/fund/statement",
        element: <ChildFundStatement />,
      },
      {
        path: "/child/saving/management",
        element: <ChildSavingManagement />,
      },
      {
        path: "/child/saving/statement",
        element: <ChildSavingStatement />,
      },
      {
        path: "/child/education",
        element: <ChildEducation />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
