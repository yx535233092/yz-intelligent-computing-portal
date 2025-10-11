import React, { useCallback } from 'react';
import type { FormProps } from 'antd';
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Divider,
  Row,
  Col,
  message,
} from 'antd';
import MediaUpload from './MediaUpload';
import { createMediaTask } from '@/apis/data-process/media';
import type { FieldType } from '@/types/data-process';

function MediaTaskForm({
  onTaskCreate,
  type,
}: {
  onTaskCreate: () => void;
  type: 'audio' | 'video';
}) {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    const { file, ...params } = values;
    const formData = new FormData();
    formData.append('file', file as File);
    // 创建任务
    const res = await createMediaTask(params, formData);
    console.log('res:', res);
    messageApi.success('创建任务成功');
    onTaskCreate();
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
    messageApi.error('创建任务失败');
  };

  const [form] = Form.useForm<FieldType>();

  const handleFileUpload = useCallback(
    (file: File) => {
      // 将文件设置到表单中
      form.setFieldValue('file', file);
    },
    [form]
  );

  return (
    <Form
      form={form}
      name="mediaTaskForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: '100%', padding: '0 80px' }}
      initialValues={{
        language: 'zh',
        task: 'transcribe',
        model: 'large-v3',
        device: 'cuda',
        device_index: 0,
        threads: 0,
        batch_size: 8,
        chunk_size: 20,
        compute_type: 'float16',
        interpolate_method: 'nearest',
        return_char_alignments: false,
        beam_size: 5,
        best_of: 5,
        patience: 1,
        length_penalty: 1,
        temperatures: 0,
        compression_ratio_threshold: 2.4,
        log_prob_threshold: -1,
        no_speech_threshold: 0.6,
        suppress_tokens: '-1',
        suppress_numerals: false,
        vad_onset: 0.5,
        vad_offset: 0.363,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      {/* 基础配置 */}
      <Divider orientation="left">基础配置</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="转录语言"
            hidden
            name="language"
            rules={[{ required: true, message: '请选择转录语言!' }]}
          >
            <Select
              options={[
                { label: '中文', value: 'zh' },
                { label: '英文', value: 'en' },
                { label: '日文', value: 'ja' },
                { label: '韩文', value: 'ko' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType>
            label="任务类型"
            hidden
            name="task"
            rules={[{ required: true, message: '请选择任务类型!' }]}
          >
            <Select
              options={[
                { label: '转录', value: 'transcribe' },
                { label: '翻译', value: 'translate' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="模型"
            name="model"
            rules={[{ required: true, message: '请选择模型!' }]}
          >
            <Select
              options={[
                { label: 'large-v3', value: 'large-v3' },
                { label: 'large-v2', value: 'large-v2' },
                { label: 'large-v1', value: 'large-v1' },
                { label: 'medium', value: 'medium' },
                { label: 'small', value: 'small' },
                { label: 'base', value: 'base' },
                { label: 'tiny', value: 'tiny' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType>
            label="推理硬件"
            name="device"
            rules={[{ required: true, message: '请选择推理硬件!' }]}
          >
            <Select
              options={[
                { label: 'CUDA', value: 'cuda' },
                { label: 'CPU', value: 'cpu' },
                { label: 'MPS', value: 'mps' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* 硬件配置 */}
      <Divider orientation="left">硬件配置</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType> label="设备索引" name="device_index" hidden>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType> label="线程数" name="threads" hidden>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType> label="批处理大小" name="batch_size">
            <InputNumber min={1} max={32} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType> label="分块大小" name="chunk_size" hidden>
            <InputNumber min={1} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType> label="计算类型" name="compute_type" hidden>
            <Select
              options={[
                { label: 'float16', value: 'float16' },
                { label: 'float32', value: 'float32' },
                { label: 'int8', value: 'int8' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType>
            label="插值方法"
            name="interpolate_method"
            hidden
          >
            <Select
              options={[
                { label: 'nearest', value: 'nearest' },
                { label: 'linear', value: 'linear' },
                { label: 'cubic', value: 'cubic' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* 转录配置 */}
      <Divider orientation="left">转录配置</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="抑制数字"
            hidden
            name="suppress_numerals"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType> label="束搜索大小" name="beam_size" hidden>
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType> label="最佳候选数" name="best_of" hidden>
            <InputNumber min={1} max={10} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType> label="耐心值" name="patience" hidden>
            <InputNumber min={0} max={10} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType> label="长度惩罚" name="length_penalty" hidden>
            <InputNumber
              min={0}
              max={10}
              step={0.1}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType> label="温度" name="temperatures">
            <InputNumber min={0} max={2} step={0.1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType>
            label="返回字符对齐"
            name="return_char_alignments"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType> label="抑制标记" name="suppress_tokens" hidden>
            <Input placeholder="例如: -1 或 1,2,3" />
          </Form.Item>
        </Col>
      </Row>

      {/* 阈值配置 */}
      <Divider orientation="left">阈值配置</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="压缩比阈值"
            hidden
            name="compression_ratio_threshold"
          >
            <InputNumber
              min={0}
              max={10}
              step={0.1}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType>
            label="对数概率阈值"
            name="log_prob_threshold"
            hidden
          >
            <InputNumber
              min={-10}
              max={0}
              step={0.1}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="无语音阈值"
            name="no_speech_threshold"
            hidden
          >
            <InputNumber min={0} max={1} step={0.1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      {/* VAD配置 */}
      <Divider orientation="left">VAD配置</Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item<FieldType> label="VAD开始阈值" name="vad_onset">
            <InputNumber min={0} max={1} step={0.1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<FieldType> label="VAD结束阈值" name="vad_offset">
            <InputNumber min={0} max={1} step={0.1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      {/* 文件上传 */}
      <Divider orientation="left">文件上传</Divider>

      <Form.Item
        name="file"
        rules={[{ required: true, message: '请上传媒体文件!' }]}
        style={{
          marginLeft: '140px',
        }}
      >
        <MediaUpload onFileUpload={handleFileUpload} type={type} />
      </Form.Item>

      <Form.Item
        style={{ marginTop: '100px' }}
        wrapperCol={{ offset: 20, span: 16 }}
      >
        <Button type="primary" htmlType="submit" size="large">
          创建转录任务
        </Button>
      </Form.Item>
    </Form>
  );
}

export default MediaTaskForm;
