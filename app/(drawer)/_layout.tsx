import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { useRouter } from "expo-router"
import { Drawer } from "expo-router/drawer"
import { icons } from 'lucide-react-native'
import { useTranslation } from "react-i18next"
import { StyleSheet } from "react-native"

import { Icon } from "@/components"
import Header from "@/components/common/Header"
import { VERSION, VERSION_PATCH } from "@/lib"
import useStore from "@/store"

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { t } = useTranslation()
    const router = useRouter()
    const { isLoggedIn, signOut } = useStore()

    const handleRouting = async (path: string) => {
        if (path === "/sign-in") {
            signOut()
            return
        }
        router.push(path as typeof router.push extends (path: infer P) => any ? P : never)
    }

    type DrawerItemProps = {
        name: string,
        label: string,
        icon: keyof typeof icons,
        path: typeof router.push extends (path: infer P) => any ? P : never,
        isAccess?: boolean,
    }

    const drawerItemList: DrawerItemProps[] = [
        {
            name: "settings",
            label: "settings",
            icon: "Cog",
            path: "/settings",
            isAccess: true,
        },
        isLoggedIn ?
            { name: "logout", label: "logout", icon: "LogOut", path: "/sign-in", isAccess: true } :
            { name: "sign-in", label: "sign-in", icon: "LogIn", path: "/sign-in", isAccess: true },
    ]

    return (
        <DrawerContentScrollView {...props}>
            {drawerItemList.map((item) => {
                return (
                    <DrawerItem
                        key={item.name}
                        icon={({ color, size }) => (
                            <Icon name={item.icon} size={size} />
                        )}
                        label={t(item.label)}
                        labelStyle={[
                            styles.navItemLabel,
                        ]}
                        style={[
                            styles.navItem,
                            { display: item.isAccess === false ? 'none' : 'flex' }
                        ]}
                        onPress={() => { handleRouting(String(item.path)) }}
                    />
                )
            })}

            <DrawerItem
                label={VERSION + `.${VERSION_PATCH}`}
                labelStyle={[styles.navItemLabel, { fontWeight: 500, fontSize: 14 }]}
                onPress={async () => { }}
            />
        </DrawerContentScrollView>
    )
}


export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                header: ({ route, options }) => <Header />,
                headerShown: true,
                drawerPosition: 'right',
                drawerStyle: { width: "70%" },
            }}
        />
    )
}

const styles = StyleSheet.create({
    navItem: {
        borderRadius: 8,
        marginHorizontal: 5,
        marginVertical: 2,
    },
    navItemLabel: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "semibold",
    },
    userInfoWrapper: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginVertical: 30,
        alignItems: "center",
    },
})

