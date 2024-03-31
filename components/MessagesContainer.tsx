import {
  Dimensions,
  ScrollView,
  Share,
  StyleSheet,
  View,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import {
  Avatar,
  Button,
  Divider,
  Icon,
  IconProps,
  Layout,
  Modal,
  Text,
} from '@ui-kitten/components';
import * as Clipboard from 'expo-clipboard';
import CustomeIcon from '@/utilities/icons/custome-icons';
import { useToast } from 'react-native-toast-notifications';
import i18n from '@/utilities/localizations/i18n';
import { Message } from '@/constants/types/chat/message';

interface MessagesContainerProps {
  item: Message;
  themeKitten: any;
}

function MessagesContainer({ item, themeKitten }: MessagesContainerProps) {
  const [copied, setCopied] = React.useState(false);

  // toast notification hook
  const toast = useToast();

  const content = item.message;

  // copy icon
  const CopyIcon = (props: IconProps) => (
    <Icon {...props} name={copied ? 'checkmark-outline' : 'copy-outline'} />
  );

  // share icon
  const ShareIcon = (props: IconProps) => (
    <Icon {...props} name='share-outline' />
  );

  // handle share
  const share = async () => {
    try {
      const result = await Share.share({
        title: 'ConneXX',
        message: `Response from ConneXX\n${content}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  // handle copy
  const copyToClipboard = () => {
    Clipboard.setStringAsync(content);
    setCopied(true);
    toast.show(i18n.t('chat.messages.copied'), {
      type: 'success',
      placement: 'top',
      duration: 900,
      animationType: 'zoom-in',
    });
    setTimeout(() => {
      setCopied(false);
    }, 900);
  };

  return (
    <View
      style={{
        alignItems: item.role == 'user' ? 'flex-end' : 'flex-start',
        marginVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: item.role == 'assistant' ? 'row' : 'row-reverse',
          justifyContent: item.role == 'user' ? 'flex-end' : 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        {item.role == 'assistant' ? (
          <View
            style={{
              padding: 5,
              marginRight: 8,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              backgroundColor: themeKitten['color-primary-default'],
            }}
          >
            <CustomeIcon
              name='robot-happy-outline'
              pack='material-community-icons'
              size={20}
              color={'white'}
            />
          </View>
        ) : null}
        <View
          style={{
            alignItems: item.role == 'user' ? 'flex-end' : 'flex-start',
          }}
        >
          <Layout
            level={item.role == 'assistant' ? '1' : '2'}
            style={{
              alignItems: item.role == 'user' ? 'flex-end' : 'flex-start',
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 4,
              maxWidth: Dimensions.get('window').width * 0.8,
              backgroundColor:
                item.role == 'assistant'
                  ? themeKitten['text-primary-color']
                  : themeKitten['color-basic-700'],
            }}
          >
            {!content ? (
              item.role == 'user' ? (
                <></>
              ) : (
                <Text category='p2' status='control'>
                  No Reply ...
                </Text>
              )
            ) : (
              <Text category='p2' status='control'>
                {content}
              </Text>
            )}
          </Layout>

          {item.role == 'assistant' && (
            <Layout level='2' style={styles.actionsContainer}>
              <View style={styles.actionsInnerContainer}>
                <Button
                  accessoryLeft={ShareIcon}
                  onPress={share}
                  style={{ flex: 1 }}
                  appearance='outline'
                  size='tiny'
                ></Button>
                <Button
                  accessoryLeft={CopyIcon}
                  onPress={copyToClipboard}
                  style={{ flex: 1 }}
                  status={copied ? 'success' : 'basic'}
                  appearance='outline'
                  size='tiny'
                ></Button>
              </View>
            </Layout>
          )}
          <Text category='label' style={{ fontSize: 9, marginTop: 5, flex: 1 }}>
            {item.time ? item.time.time : '10:00'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    marginTop: 8,
    width: '100%',
    maxWidth: Dimensions.get('window').width * 0.4,
    minWidth: Dimensions.get('window').width * 0.2,
    borderRadius: 4,
    gap: 8,

    // flex: 1,
  },
  actionsInnerContainer: {
    gap: 8,
    flexDirection: 'row',
    width: '100%',
  },
});

export default MessagesContainer;
