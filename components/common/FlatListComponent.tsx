import { useTheme } from '@/contexts/ThemeProvider'
import {
    FlatList,
    FlatListProps,
    ListRenderItem,
    View,
} from 'react-native'
import IconLabel from './IconLabel'
import RefreshControlComponent from './RefreshControlComponent'
import TextComponent from './TextComponent'
import { windowHeight } from '@/lib'

interface FlatListComponentProps extends FlatListProps<any> {
    data: any[]
    keyExtractor: (item: any) => string
    renderItem: ListRenderItem<any>
    onRefresh?: () => void
    refreshing?: boolean
    loadMore?: () => void
    isLoading?: boolean
    isFetchingNextPage?: boolean
    isError?: boolean
    numColumns?: number
    horizontal?: boolean
    showsHorizontalScrollIndicator?: boolean
    columnWrapperStyle?: FlatListProps<any>['columnWrapperStyle']
    contentContainerStyle?: FlatListProps<any>['contentContainerStyle']
}

export default function FlatListComponent({
    data = [],
    keyExtractor,
    renderItem,
    onRefresh,
    refreshing = false,
    loadMore,
    isLoading = false,
    isFetchingNextPage = false,
    isError = false,
    numColumns = 1,
    horizontal = false,
    showsHorizontalScrollIndicator = false,
    columnWrapperStyle,
    contentContainerStyle,
    ...props
}: FlatListComponentProps) {
    const { colors } = useTheme()
    return (
        <FlatList
            data={data}
            numColumns={numColumns}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            refreshControl={
                onRefresh ? (
                    <RefreshControlComponent
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                ) : undefined
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
                (data.length < 1 && !isLoading) ? (
                    <TextComponent
                        style={{
                            textAlign: 'center',
                            marginTop: 32,
                            color: colors.outlineVariant
                        }}
                        text={isError ? 'error loading data' : 'no data found'}
                    />
                ) : null
            }
            ListFooterComponent={
                (isLoading || isFetchingNextPage) ? (
                    <IconLabel
                        iconName='Loader'
                        size={14}
                        color={colors.outlineVariant}
                        label='loading'
                        style={{ alignSelf: 'center' }}
                    />
                ) : data.length > 0 ? (
                    (
                        <TextComponent
                            style={{ textAlign: 'center', marginVertical: 16, color: colors.outlineVariant }}
                            text="end of list"
                        />
                    )
                ) : null
            }
            {...(numColumns > 1 && {
                columnWrapperStyle: [{
                    justifyContent: 'space-between',
                    gap: 8,
                    marginBottom: 8,
                }, columnWrapperStyle],
            })}
            contentContainerStyle={[{
                paddingHorizontal: 2,
                gap: 8,
                flexGrow: 1,
                paddingBottom: windowHeight * 0.2,
            }, contentContainerStyle]}
            {...props}
        />
    )
}
