import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '@ui-kitten/components';
import CustomeIcon from '@/utilities/icons/custome-icons';
import { useAppContext } from '@/utilities/context/app-context';

interface FeatureLineProps {
    title: string;
}

export default function FeatureLine({
    title
}: FeatureLineProps) {

    const { kittenTheme, } = useAppContext();

    return (
        <View style={styles.container}>
            <CustomeIcon
                name="check-circle-fill"
                pack="octicons"
                size={22}
                color={kittenTheme['color-primary-default']}
            />
            <Text category='h6' style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        paddingVertical: 4,
        gap: 11,
    },
    title: {
        flex: 1
    }
})