'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button, Input, message, Spin, Select } from 'antd';
import {
  TranslationOutlined,
  CopyOutlined,
  ClearOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { translateAPI } from '@/modules/data-process/api/translate';

const { TextArea } = Input;
const { Option } = Select;

// 语言映射（code -> 中文名）
const languageMap: Record<string, string> = {
  ar: '阿拉伯语',
  cs: '捷克语',
  da: '丹麦语',
  de: '德语',
  en: '英语',
  es: '西班牙语',
  fi: '芬兰语',
  ru: '俄语',
  sv: '瑞典语',
  th: '泰语',
  tr: '土耳其语',
  uk: '乌克兰语',
  vi: '越南语',
  zh: '中文',
  ms: '马来语',
  nb: '挪威语',
  nl: '荷兰语',
  no: '挪威语',
  pl: '波兰语',
  pt: '葡萄牙语',
  ro: '罗马尼亚语',
  fr: '法语',
  hr: '克罗地亚语',
  hu: '匈牙利语',
  id: '印尼语',
  it: '意大利语',
  ja: '日语',
  ko: '韩语',
};

const languageOptions = Object.entries(languageMap).map(([code, name]) => ({
  value: code,
  label: name,
}));

export default function TextTranslatePage() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState<string>('zh');
  const [targetLanguage, setTargetLanguage] = useState<string>('vi');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  // 实际的翻译函数
  const performTranslation = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        setTranslatedText('');
        return;
      }

      setIsTranslating(true);

      try {
        console.log('发送翻译请求:', text);

        const res = await translateAPI({
          from: sourceLanguage,
          to: targetLanguage,
          chinese_text: text,
        });

        console.log('翻译结果:', res);

        // 根据API返回的数据结构设置翻译结果
        if (res && typeof res === 'object') {
          // 如果返回的是对象，尝试获取翻译结果
          const result = res.out_text || JSON.stringify(res);
          setTranslatedText(result);
        } else {
          // 如果直接返回字符串
          setTranslatedText(res || '翻译失败');
        }
      } catch (error) {
        console.error('翻译失败:', error);
        if (error instanceof Error) {
          if (error.message.includes('Failed to fetch')) {
            console.warn('网络连接失败');
          } else {
            console.warn(`翻译失败: ${error.message}`);
          }
        }
        setTranslatedText('翻译失败，请检查网络连接');
      } finally {
        setIsTranslating(false);
      }
    },
    [sourceLanguage, targetLanguage]
  );

  // 防抖处理的翻译函数
  const debouncedTranslate = useCallback(
    (text: string) => {
      // 清除之前的定时器
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // 如果文本为空，立即清空翻译结果
      if (!text.trim()) {
        setTranslatedText('');
        setIsTranslating(false);
        return;
      }

      // 设置新的定时器
      const timer = setTimeout(() => {
        performTranslation(text);
      }, 800); // 800ms 防抖延迟

      setDebounceTimer(timer);
    },
    [debounceTimer, performTranslation]
  );

  // 处理输入文本变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);

    // 显示正在输入的状态
    if (value.trim() && !isTranslating) {
      setIsTranslating(true);
    }

    // 触发防抖翻译
    debouncedTranslate(value);
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // 当语言切换时，如当前有输入，则重新触发翻译
  useEffect(() => {
    if (inputText.trim()) {
      // 清空之前的翻译结果，避免显示失败状态
      setTranslatedText('');
      // 设置翻译状态为true，确保显示"正在翻译中"
      setIsTranslating(true);
      debouncedTranslate(inputText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceLanguage, targetLanguage]);

  // 复制翻译结果
  const handleCopy = async () => {
    if (!translatedText) {
      message.warning('没有可复制的内容');
      return;
    }

    try {
      await navigator.clipboard.writeText(translatedText);
    } catch (error) {
      console.error('复制失败:', error);
      message.error('复制失败');
    }
  };

  // 清空内容
  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    // 清除防抖定时器
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      setDebounceTimer(null);
    }
    setIsTranslating(false);
  };

  // 互换语言与文本
  const handleSwapLanguages = () => {
    const currentSource = sourceLanguage;
    const currentTarget = targetLanguage;
    setSourceLanguage(currentTarget);
    setTargetLanguage(currentSource);
    // 将已翻译结果作为新的输入，便于继续翻译
    if (translatedText.trim()) {
      const newInput = translatedText;
      setInputText(newInput);
      setTranslatedText('');
      // 设置翻译状态为true，确保显示"正在翻译中"
      setIsTranslating(true);
      debouncedTranslate(newInput);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 页面标题 */}
        <div className="py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <TranslationOutlined className="text-[#d32d26]" />
            小语种翻译
          </h1>
        </div>

        {/* 翻译界面 - 左右布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10 min-h-[700px]">
          {/* 左侧 - 输入区域 */}
          <div className="bg-gray-50 rounded-lg h-full flex flex-col">
            {/* 输入区域标题和工具栏 */}
            <div className="flex items-center justify-between p-4 bg-gray-200 rounded-t-lg">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="font-medium text-gray-700">源语言</span>
                <Select
                  value={sourceLanguage}
                  onChange={setSourceLanguage}
                  size="small"
                  style={{ width: 140 }}
                  bordered={false}
                  showSearch
                  optionFilterProp="children"
                >
                  {languageOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
                <Button
                  icon={<SwapOutlined />}
                  size="small"
                  onClick={handleSwapLanguages}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  icon={<ClearOutlined />}
                  onClick={handleClear}
                  disabled={!inputText}
                  size="small"
                  type="text"
                  className="text-gray-500 hover:text-[#d32d26]"
                >
                  清空
                </Button>
              </div>
            </div>

            {/* 输入文本区域 */}
            <div className="flex-1 p-6">
              <TextArea
                value={inputText}
                onChange={handleInputChange}
                placeholder="请输入需要翻译的内容..."
                className="h-full resize-none border-none shadow-none"
                style={{
                  boxShadow: 'none',
                  border: 'none',
                  outline: 'none',
                }}
                maxLength={5000}
                showCount
              />
            </div>
          </div>

          {/* 右侧 - 输出区域 */}
          <div className="bg-gray-100 rounded-lg h-full flex flex-col">
            {/* 输出区域标题和工具栏 */}
            <div className="flex items-center justify-between p-4 bg-gray-300 rounded-t-lg">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="font-medium text-gray-700">翻译结果</span>
                <Select
                  value={targetLanguage}
                  onChange={setTargetLanguage}
                  size="small"
                  style={{ width: 140 }}
                  bordered={false}
                  showSearch
                  optionFilterProp="children"
                >
                  {languageOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex items-center gap-2">
                {isTranslating && (
                  <span className="text-xs text-blue-500 flex items-center gap-1">
                    <Spin size="small" />
                    翻译中...
                  </span>
                )}
                {translatedText && (
                  <Button
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={handleCopy}
                    size="small"
                    className="text-gray-500 hover:text-[#d32d26]"
                  >
                    复制
                  </Button>
                )}
              </div>
            </div>

            {/* 翻译结果显示区域 */}
            <div className="flex-1 p-6 overflow-auto">
              {!inputText ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <TranslationOutlined className="text-4xl mb-3 text-gray-300" />
                    <p className="text-lg mb-2">开始输入文本进行翻译</p>
                    <p className="text-sm">支持实时翻译，输入即可看到结果</p>
                  </div>
                </div>
              ) : isTranslating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Spin size="large" />
                    <p className="text-gray-500 mt-3">正在翻译中，请稍候...</p>
                  </div>
                </div>
              ) : translatedText ? (
                <div className="h-full flex flex-col">
                  <div className="flex-1 p-4 bg-white rounded-lg overflow-auto">
                    <div className="text-gray-800 font-normal leading-relaxed text-base break-words overflow-wrap-anywhere">
                      {translatedText}
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500 text-right flex-shrink-0">
                    翻译完成 · 字符数: {translatedText.length}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <span className="text-2xl">⚠️</span>
                    <p className="mt-2">翻译失败</p>
                    <p className="text-sm">请检查网络连接或稍后重试</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
