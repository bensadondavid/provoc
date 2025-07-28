import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

const Entry = lazy(()=> import('./Pages/Entry'))
const Login = lazy(()=> import('./Pages/Login'))
const SignUp = lazy(()=> import('./Pages/SignUp'))
const Home = lazy(()=> import('./Pages/Home'))
const PrivateRoute = lazy(()=> import('./Components/PrivateRoute'))
const Lists = lazy(()=>import('./Pages/Lists'))
const NewList = lazy(()=>import('./Pages/NewList'))
const List = lazy(()=>import('./Pages/List'))
const Stats = lazy(()=>import('./Pages/Stats'))
const MyAccount = lazy(()=>import('./Pages/MyAccount'))

function App() {

  return (
    <>
    <BrowserRouter >
      <Suspense>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/list/:id" element={<List />} />
            <Route path="/new-list" element={<NewList />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/my-account" element={<MyAccount />} />
          </Route>  
        </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
