import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text } from '@ui-kitten/components';
import { router } from 'expo-router';

interface HomeSectionProps {
    icon: () => React.ReactNode;
    title: string;
    messages: string[];
    kittenTheme?: any
}


export default function HomeSection({
    icon,
    title,
    messages,
    kittenTheme,
}: HomeSectionProps) {
    return (

        <View style={{
            borderRadius: 10,
            borderWidth: 1.8,
            borderColor: kittenTheme['color-basic-600'],
            padding: 15,
            gap: 22,
            marginTop: 22
        }}>
            <View style={styles.titleContainer}>
                {icon()}
                <Text category="h6" style={styles.messageText}>{title}</Text>
            </View>
            <View style={styles.messagesContainer}>

                {
                    messages.map((message, index) =>
                        <Card
                            key={index}
                            onPress={() => router.navigate({ pathname: 'chat', params: { message: message, prompt: true } })}
                            appearance="filled"
                            // disabled
                        >
                            <Text category="p1" style={styles.messageText} key={index}>{message}</Text>
                        </Card>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messagesContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        padding: 10,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    messageText: {
        textAlign: "center",
    }
})