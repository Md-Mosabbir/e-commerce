import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

import SignIn from "../components/Auth/SignIn"
import SignUp from "../components/Auth/SignUp"

export default function Authentication() {
  return (
    <Tabs defaultValue="sign-up" className="w-[400px] my-8 font-montzerrat">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-up">Sign-up</TabsTrigger>
        <TabsTrigger value="sign-in">Sign-in</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-up">
        <Card>
          <CardHeader>
            <CardTitle>Sign-Up</CardTitle>
            <CardDescription>
              Create an account to start shopping and tracking your orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SignUp />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sign-in">
        <Card>
          <CardHeader>
            <CardTitle>Sign-In</CardTitle>
            <CardDescription>
              Sign in to your account to continue shopping and tracking your
              orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SignIn />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
