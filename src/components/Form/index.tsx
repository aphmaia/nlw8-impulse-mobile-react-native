
import React, { useState } from 'react';

import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView, 
  ScrollView

} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { captureScreen } from 'react-native-view-shot'

import { ArrowLeft } from 'phosphor-react-native';
import { theme } from '../../theme'; 
import { styles } from './styles';

import { FeedbackType } from '../../components/Widget';
import { ScreenshotButton } from '../../components/ScreenshotButton';
import { Button } from '../../components/Button';
import { feedbackTypes } from '../../utils/feedbackTypes' 

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {

  const [ screenshot, setScreenshot ] = useState<string | null>(null)

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.error(error));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
      >
        <View style={styles.container} >
          <View style={styles.header}>
            <TouchableOpacity onPress={ onFeedbackCanceled }>
              <ArrowLeft
                size={24}
                weight="bold"
                color={theme.colors.text_primary}
              />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Image
                source={feedbackTypeInfo.image}
                style={styles.image}
              />

              <Text style={styles.titleText}>
                {feedbackTypeInfo.title}
              </Text>

            </View>

          </View>

          <TextInput
            multiline
            style={styles.input}
            placeholder="Conte com detalhes o que está acontecendo..."
            placeholderTextColor={theme.colors.text_secondary}
            autoCorrect={false}
          />

          <View style={styles.footer}>
            <ScreenshotButton
              onTakeShot={handleScreenshot}
              onRemoveShot={handleScreenshotRemove}
              screenshot={screenshot}
            />

            <Button
              isLoading={false}
            />

          </View>

        </View> 
      </KeyboardAvoidingView>
    </ScrollView>
  );
}