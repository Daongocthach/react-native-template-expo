import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { DataTable } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import TextComponent from './TextComponent'
import { useTheme } from '@/contexts/ThemeProvider'
import RefreshControlComponent from './RefreshControlComponent'


type TitleConfig = {
    name: string
    numeric?: boolean
}

type InfiniteTableProps<T> = {
    data: T[]
    renderRow: (item: T, index: number) => JSX.Element
    loadMore: () => void
    refreshing: boolean
    onRefresh: () => void
    headers?: TitleConfig[]
    ListFooterComponent?: React.ReactElement | null
}


export default function InfiniteTable<T>({
    data,
    renderRow,
    loadMore,
    refreshing,
    onRefresh,
    headers = [],
    ListFooterComponent,
}: InfiniteTableProps<T>) {
    const { t } = useTranslation()
    const { colors } = useTheme()
    return (
        <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }: ListRenderItemInfo<T>) => renderRow(item, index)}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            refreshing={refreshing}
            onRefresh={onRefresh}
            refreshControl={
                onRefresh ? (
                    <RefreshControlComponent
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                ) : undefined
            }
            ListHeaderComponent={
                headers.length > 0 ? (
                    <DataTable.Header style={{
                        backgroundColor: colors.surfaceVariant,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                    }}>
                        {headers.map((header, index) => (
                            <DataTable.Title key={index} numeric={header?.numeric}>
                                <TextComponent text={t(header?.name)} size={12} font='semibold' />
                            </DataTable.Title>
                        ))}
                    </DataTable.Header>
                ) : null
            }
            ListFooterComponent={ListFooterComponent}
            stickyHeaderIndices={headers.length > 0 ? [0] : undefined}
        />
    )
}
