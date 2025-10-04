import { UserDataProps } from '@/lib'
import { FlatList, StyleSheet, View } from 'react-native'

import { useTheme } from '@/contexts/ThemeProvider'
import RowComponent from './RowComponent'
import UserAvatar from './UserAvatar'
import MenuComponent from './MenuComponent'
import AvatarLabel from './AvatarLabel'

interface ListAvatarProps {
    users: UserDataProps[]
    iconSize?: number
    maxUsers?: number
}

const ListAvatar = ({ users = [], iconSize = 32, maxUsers = 3 }: ListAvatarProps) => {
    const { colors } = useTheme()
    const showUsers = users.slice(0, maxUsers)
    const remaining = users.length - maxUsers

    return (
        <MenuComponent
            children={
                <RowComponent style={{ position: 'relative', height: iconSize }}>
                    {showUsers.map((user, index) => {
                        const isLast = index === maxUsers - 1 && remaining > 0

                        return (
                            <View
                                key={isLast ? 'more' : user.id}
                                style={[
                                    styles.avatarWrapper,
                                    {
                                        left: index * (iconSize * 0.7),
                                        zIndex: maxUsers + index,
                                        borderColor: colors.surfaceVariant,
                                    },
                                ]}
                            >
                                <UserAvatar
                                    avatarSize={iconSize}
                                    avatarUrl={isLast ? undefined : user?.avatar}
                                    userName={isLast ? `+ ${remaining}` : user?.full_name}
                                    avatarColor={isLast ? colors.primaryContainer : colors.primary}
                                />
                            </View>
                        )
                    })}
                </RowComponent>
            }
            menuChildren={() => (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <AvatarLabel
                            key={item.id}
                            label={item.full_name}
                            size={28}
                        />
                    )}
                    contentContainerStyle={{ gap: 5}}
                    scrollEnabled={false}
                />
            )}
            fullWidth={false}
        />
    )
}

const styles = StyleSheet.create({
    avatarWrapper: {
        position: 'absolute',
        borderWidth: 2,
        borderRadius: 999,
        overflow: 'hidden',
    },
})

export default ListAvatar
