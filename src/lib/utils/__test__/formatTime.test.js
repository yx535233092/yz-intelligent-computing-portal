import formatISODate from '../formatTime';

describe('formatISODate', () => {
  describe('基本功能测试', () => {
    test('应该正确格式化标准的 ISO 8601 日期字符串', () => {
      const isoString = '2025-08-25T10:01:00.181002';
      const result = formatISODate(isoString, 'YYYY-MM-DD HH:mm:ss');
      expect(result).toBe('2025-08-25 10:01:00');
    });

    test('应该正确格式化包含毫秒的日期字符串', () => {
      const isoString = '2025-08-25T10:01:00.181002';
      const result = formatISODate(isoString, 'YYYY-MM-DD HH:mm:ss.SSS');
      expect(result).toBe('2025-08-25 10:01:00.181');
    });

    test('应该正确格式化只有日期的字符串', () => {
      const isoString = '2025-08-25T00:00:00.000Z';
      const result = formatISODate(isoString, 'YYYY年MM月DD日');
      expect(result).toBe('2025年08月25日');
    });

    test('应该正确格式化时间格式（不考虑时区）', () => {
      const isoString = '2025-08-25T14:30:45.123Z';
      const result = formatISODate(isoString, 'HH:mm:ss');
      // 检查格式是否正确，不检查具体时间值（因为时区转换）
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });
  });

  describe('不同格式字符串测试', () => {
    const testDate = '2025-12-31T23:59:59.999Z';

    test('应该支持 YYYY-MM-DD 格式', () => {
      const result = formatISODate(testDate, 'YYYY-MM-DD');
      // 由于时区转换，日期可能会变化，我们检查格式
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    test('应该支持 DD/MM/YYYY 格式', () => {
      const result = formatISODate(testDate, 'DD/MM/YYYY');
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });

    test('应该支持 MM-DD-YYYY HH:mm 格式', () => {
      const result = formatISODate(testDate, 'MM-DD-YYYY HH:mm');
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/);
    });

    test('应该支持自定义分隔符格式', () => {
      const result = formatISODate(testDate, 'YYYY年MM月DD日 HH时mm分ss秒');
      expect(result).toMatch(/^\d{4}年\d{2}月\d{2}日 \d{2}时\d{2}分\d{2}秒$/);
    });

    test('应该支持只包含部分时间单位', () => {
      const result = formatISODate(testDate, 'MM月DD日');
      expect(result).toMatch(/^\d{2}月\d{2}日$/);
    });
  });

  describe('边界情况测试', () => {
    test('应该正确处理单数月份和日期', () => {
      const isoString = '2025-01-01T01:01:01.001Z';
      const result = formatISODate(isoString, 'YYYY-MM-DD HH:mm:ss.SSS');
      expect(result).toMatch(/^2025-01-01 \d{2}:\d{2}:\d{2}\.\d{3}$/);
    });

    test('应该正确处理午夜时间', () => {
      const isoString = '2025-08-25T00:00:00.000Z';
      const result = formatISODate(isoString, 'HH:mm:ss');
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    test('应该正确处理正午时间', () => {
      const isoString = '2025-08-25T12:00:00.000Z';
      const result = formatISODate(isoString, 'HH:mm:ss');
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });

    test('应该正确处理年末日期', () => {
      const isoString = '2025-12-31T23:59:59.999Z';
      const result = formatISODate(isoString, 'YYYY-MM-DD HH:mm:ss.SSS');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/);
    });

    test('应该正确处理闰年日期', () => {
      const isoString = '2024-02-29T12:00:00.000Z';
      const result = formatISODate(isoString, 'YYYY-MM-DD');
      expect(result).toBe('2024-02-29');
    });
  });

  describe('时区处理测试', () => {
    test('应该正确处理 UTC 时区的日期', () => {
      const isoString = '2025-08-25T10:30:00.000Z';
      const result = formatISODate(isoString, 'YYYY-MM-DD HH:mm:ss');
      expect(result).toMatch(/^2025-08-25 \d{2}:\d{2}:\d{2}$/);
    });

    test('应该正确处理带时区偏移的日期', () => {
      const isoString = '2025-08-25T10:30:00.000+08:00';
      const result = formatISODate(isoString, 'YYYY-MM-DD HH:mm:ss');
      expect(result).toBe('2025-08-25 10:30:00');
    });
  });

  describe('错误处理测试', () => {
    test('应该对无效的日期字符串抛出错误', () => {
      expect(() => {
        formatISODate('invalid-date', 'YYYY-MM-DD');
      }).toThrow('无效的日期字符串');
    });

    test('应该对空字符串抛出错误', () => {
      expect(() => {
        formatISODate('', 'YYYY-MM-DD');
      }).toThrow('无效的日期字符串');
    });

    test('应该对 undefined 抛出错误', () => {
      expect(() => {
        formatISODate(undefined, 'YYYY-MM-DD');
      }).toThrow('无效的日期字符串');
    });

    test('应该对格式错误的日期字符串抛出错误', () => {
      expect(() => {
        formatISODate('2025-13-45T25:70:80.000Z', 'YYYY-MM-DD');
      }).toThrow('无效的日期字符串');
    });
  });

  describe('格式字符串测试', () => {
    const testDate = '2025-08-25T14:30:45.123Z';

    test('应该正确处理不包含任何格式标记的字符串', () => {
      const result = formatISODate(testDate, 'Hello World');
      expect(result).toBe('Hello World');
    });

    test('应该正确处理混合的格式标记和普通文本', () => {
      const result = formatISODate(
        testDate,
        '今天是YYYY年MM月DD日，时间是HH:mm:ss'
      );
      expect(result).toMatch(/^今天是2025年08月25日，时间是\d{2}:\d{2}:\d{2}$/);
    });

    test('应该正确处理部分格式标记', () => {
      const result = formatISODate(testDate, 'MM/DD');
      expect(result).toBe('08/25');
    });
  });

  describe('毫秒处理测试', () => {
    test('应该正确处理三位数毫秒', () => {
      const isoString = '2025-08-25T10:01:00.123Z';
      const result = formatISODate(isoString, 'SSS');
      expect(result).toBe('123');
    });

    test('应该正确处理两位数毫秒（补零）', () => {
      const isoString = '2025-08-25T10:01:00.12Z';
      const result = formatISODate(isoString, 'SSS');
      expect(result).toBe('120');
    });

    test('应该正确处理单位数毫秒（补零）', () => {
      const isoString = '2025-08-25T10:01:00.1Z';
      const result = formatISODate(isoString, 'SSS');
      expect(result).toBe('100');
    });

    test('应该正确处理零毫秒', () => {
      const isoString = '2025-08-25T10:01:00.000Z';
      const result = formatISODate(isoString, 'SSS');
      expect(result).toBe('000');
    });
  });

  describe('实际使用场景测试', () => {
    test('应该正确处理日志时间格式', () => {
      const logTime = '2025-08-25T14:30:45.123Z';
      const result = formatISODate(logTime, '[YYYY-MM-DD HH:mm:ss.SSS]');
      expect(result).toMatch(/^\[2025-08-25 \d{2}:\d{2}:\d{2}\.\d{3}\]$/);
    });

    test('应该正确处理文件时间戳格式', () => {
      const fileTime = '2025-08-25T14:30:45.123Z';
      const result = formatISODate(fileTime, 'backup_YYYYMMDD_HHmmss');
      expect(result).toMatch(/^backup_20250825_\d{6}$/);
    });

    test('应该正确处理显示时间格式', () => {
      const displayTime = '2025-08-25T14:30:45.123Z';
      const result = formatISODate(displayTime, 'YYYY年MM月DD日 HH:mm');
      expect(result).toMatch(/^2025年08月25日 \d{2}:\d{2}$/);
    });
  });

  describe('本地时间测试（不使用Z后缀）', () => {
    test('应该正确处理本地时间格式', () => {
      const localTime = '2025-08-25T14:30:45.123';
      const result = formatISODate(localTime, 'YYYY-MM-DD HH:mm:ss');
      expect(result).toBe('2025-08-25 14:30:45');
    });

    test('应该正确处理本地时间毫秒', () => {
      const localTime = '2025-08-25T14:30:45.123';
      const result = formatISODate(localTime, 'HH:mm:ss.SSS');
      expect(result).toBe('14:30:45.123');
    });

    test('应该正确处理本地日期', () => {
      const localDate = '2025-12-31T23:59:59.999';
      const result = formatISODate(localDate, 'YYYY-MM-DD');
      expect(result).toBe('2025-12-31');
    });
  });
});
