import json
import os

def merge_json_files(input_file_paths, output_file_path):
    """
    合并多个 JSON 文件，每个文件都包含一个 JSON 对象列表。

    参数:
        input_file_paths (list): 一个包含所有输入 JSON 文件路径的列表。
        output_file_path (str): 合并后的输出文件的保存路径。
    """
    merged_data = []

    # 循环读取所有输入文件
    for file_path in input_file_paths:
        if not os.path.exists(file_path):
            print(f"警告：文件未找到，跳过: {file_path}")
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # 检查文件内容是否为列表，然后合并
                if isinstance(data, list):
                    merged_data.extend(data)
                else:
                    print(f"警告：文件格式不正确，跳过: {file_path}。预期的格式是 JSON 数组 ([...])。")
        except json.JSONDecodeError:
            print(f"警告：文件解析失败，跳过: {file_path}。请确保它是有效的 JSON。")
        except Exception as e:
            print(f"处理文件时发生错误: {file_path}。错误信息: {e}")

    # 将合并后的数据写入新文件
    if merged_data:
        try:
            with open(output_file_path, 'w', encoding='utf-8') as f:
                json.dump(merged_data, f, indent=4, ensure_ascii=False)
            print(f"成功将 {len(input_file_paths)} 个文件合并到: {output_file_path}")
            print(f"合并后的文件包含 {len(merged_data)} 个条目。")
        except Exception as e:
            print(f"写入输出文件时发生错误: {output_file_path}。错误信息: {e}")
    else:
        print("没有可合并的数据。")

# 假设你已经有了 file1.json 和 file2.json
input_files = ['file1.json', 'file2.json']
output_file = 'merged_data.json'

merge_json_files(input_files, output_file)