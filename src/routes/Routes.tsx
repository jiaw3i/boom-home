import {Route, Routes} from "react-router-dom";
import React, {lazy} from "react";
import PostView from "@/pages/blog/PostView";
import AuthRoute from "@/routes/AuthRoute";

const RecordWall = lazy(() => import('@/pages/recordwall/RecordWall'));
const Blog = lazy(() => import('@/pages/blog/Blog'));
const Projects = lazy(() => import('@/components/Projects'));
const ManageProject = lazy(() => import('@/pages/manage/project/ManageProject'));
const ManageBlog = lazy(() => import('@/pages/manage/blog/ManageBlog'));
const EditPost = lazy(() => import('@/pages/manage/blog/EditPost'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Loader = lazy(() => import('@/components/Loader'));
const ChatBot = lazy(() => import('@/components/chatbot/ChatBot'));
const ChatType = lazy(() => import('@/components/chatbot/ChatType'));
const Home = lazy(() => import('@/components/Home'));
const MyRoutes = (props: any) => {
    const {setImgUrl} = props;
    return (
        <Routes>
            <Route path={"/lab"} element={
                <React.Suspense fallback={<Loader/>}>
                    <Projects/>
                </React.Suspense>
            }/>
            <Route path={"/"} element={<RecordWall setImgUrl={setImgUrl}/>}/>
            <Route path={"/aboutme"} element={
                <React.Suspense fallback={<Loader/>}>
                    <Home/>
                </React.Suspense>
            }/>
            <Route path={"/manage"}>
                <Route path={"project"} element={
                    <AuthRoute element={<React.Suspense fallback={<Loader/>}>
                        <ManageProject/>
                    </React.Suspense>}/>

                    // </AuthRoute>

                }/>
                <Route path={"blog"} element={
                    <AuthRoute element={
                        <React.Suspense fallback={<Loader/>}>
                            <ManageBlog/>
                        </React.Suspense>
                    }
                    />
                }>
                </Route>
                <Route path={"blog/edit"} element={
                    <AuthRoute
                        element={
                            <React.Suspense fallback={<Loader/>}>
                                <EditPost/>
                            </React.Suspense>
                        }
                    />

                }/>
                <Route path={"blog/edit/:postId"} element={
                    <AuthRoute
                        element={
                            <React.Suspense fallback={<Loader/>}>
                                <EditPost/>
                            </React.Suspense>
                        }
                    />
                }/>
            </Route>
            <Route path={"/recordwall"} element={
                <RecordWall setImgUrl={setImgUrl}/>
            }/>
            <Route path={"/blog"} element={
                <Blog/>
            }/>
            <Route path={"/blog/:postId"} element={
                <PostView/>
            }/>
            <Route path={"/chatbot"} element={
                <React.Suspense fallback={<Loader/>}>
                    <ChatType/>
                </React.Suspense>
            }>
            </Route>
            <Route path={"/chatbot/:type"} element={
                <React.Suspense fallback={<Loader/>}>
                    <ChatBot/>
                </React.Suspense>
            }/>

            <Route path={"*"} element={
                <React.Suspense fallback={<Loader/>}>
                    <NotFound/>
                </React.Suspense>
            }>
            </Route>
        </Routes>
    )
}

export default MyRoutes