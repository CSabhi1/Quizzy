import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/redux/store";
import { Box } from "@mui/material";
import { privateRoutes, publicRoutes } from "./routing/routes";
import Loader from "./shared/components/feedback/Loader";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./redux/slices/AuthSlice";
import { auth } from "@app/firebase/firebase";

type route = {
	path: string;
	name: string;
	allowedRoles?: string[];
	component: React.ComponentType;
	child?: route[];
};

const App: React.FC = () => {
	const dispatch = useDispatch();
	const { user, loading } = useSelector((state: RootState) => state.auth);

	const [checkingAuth, setCheckingAuth] = useState(true); // Prevent UI flicker

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			dispatch(setUser(currentUser)); // Set user in Redux state
			setCheckingAuth(false); // Now safe to render UI
		});

		return () => unsubscribe();
	}, [dispatch]);

	if (loading || checkingAuth) return <Loader />; // Show loading until Firebase resolves

	const createPublicRoute = (routesArray: route[]) =>
		routesArray?.map(({ path, component: Component, child }) => (
			<Route key={path} path={path} element={<Component />}>
				{child ? createPublicRoute(child) : ""}
			</Route>
		));

	const createPrivateRoute = (routesArray: route[]) =>
		routesArray?.map(({ path, component: Component, child }) => (
			<Route key={path} path={path} element={<Component />}>
				{child ? createPublicRoute(child) : ""}
			</Route>
		));

	console.log(user);
	if (loading) return <Loader />; // Show loading screen while authenticating

	return (
		<Box component="div">
			<Router>
				{/* <Header />
				<Loader show={loading}></Loader> */}
				{!loading && (
					<Routes>
						{user
							? createPrivateRoute(privateRoutes)
							: createPublicRoute(publicRoutes)}
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				)}
			</Router>
		</Box>
	);
};

export default App;
