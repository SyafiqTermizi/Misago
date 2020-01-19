import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import {
  AuthModalProvider,
  AuthContext,
  CategoriesContext,
  SettingsContext,
} from "../Context"
import AppDataQuery from "./AppDataQuery"
import AppErrorBoundary from "./AppErrorBoundary"
import AppLanguageLoader from "./AppLanguageLoader"

const Navbar = React.lazy(() => import("../Navbar"))
const AuthChangedAlert = React.lazy(() => import("../AuthChangedAlert"))
const AuthModal = React.lazy(() => import("../AuthModal"))

const App: React.FC = () => {
  return (
    <AppErrorBoundary>
      <AppDataQuery>
        {({ data: { auth, categories, settings } }) => (
          <AppLanguageLoader language="en">
            <AuthContext.Provider value={auth}>
              <CategoriesContext.Provider value={categories}>
                <SettingsContext.Provider value={settings}>
                  <AuthModalProvider>
                    <Router>
                      <React.Suspense fallback={<div />}>
                        <AuthChangedAlert user={auth} />
                      </React.Suspense>
                      <React.Suspense fallback={<div />}>
                        <Navbar settings={settings} user={auth} />
                      </React.Suspense>
                      <Switch>
                        <Route path="/">
                          <div>Hello world!</div>
                        </Route>
                      </Switch>
                      <React.Suspense fallback={<div />}>
                        <AuthModal settings={settings} />
                      </React.Suspense>
                    </Router>
                  </AuthModalProvider>
                </SettingsContext.Provider>
              </CategoriesContext.Provider>
            </AuthContext.Provider>
          </AppLanguageLoader>
        )}
      </AppDataQuery>
    </AppErrorBoundary>
  )
}

export default App