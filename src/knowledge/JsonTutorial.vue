<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import AdBanner from '@/components/AdBanner.vue'

usePageMeta('JSON 教程 - 从入门到精通', 'JSON（JavaScript Object Notation）教程：什么是JSON、语法规则、数据类型、parse/stringify方法、实际应用场景')
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <AdBanner position="header" />

    <h1 class="text-3xl font-bold mb-2">JSON 教程</h1>
    <p class="text-sm mb-8" :style="{ color: 'var(--text-secondary)' }">JSON（JavaScript Object Notation）从入门到精通</p>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">一、什么是 JSON？</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>JSON（JavaScript Object Notation，JavaScript 对象表示法）是一种轻量级的数据交换格式。它基于 ECMAScript（欧洲计算机协会制定的 JavaScript 规范）的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。</p>
        <p>JSON 的诞生源于 2000 年代初，Douglas Crockford 从 JavaScript 的对象字面量语法中提取出来，推广为一种语言无关的数据格式。如今 JSON 已经成为互联网上最主流的数据交换格式，几乎所有的 Web API 都使用 JSON 作为数据传输格式。</p>
        <p>JSON 的特点可以概括为：<strong>轻量、易读、易解析、语言无关</strong>。它使用人类可读的文本表示结构化数据，同时机器也能高效地解析和生成。</p>
        <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
          <div class="text-xs font-medium mb-2" :style="{ color: 'var(--text-primary)' }">一个典型的 JSON 示例：</div>
          <pre class="text-xs font-mono leading-relaxed" :style="{ color: 'var(--text-primary)' }">{
  "name": "JSON",
  "type": "data-interchange",
  "year": 2001,
  "popular": true,
  "extensions": [".json"],
  "creator": "Douglas Crockford"
}</pre>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">二、JSON 语法规则</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>JSON 的语法非常简洁，只有几条核心规则：</p>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>数据以键值对形式存在</strong>：键名和值之间用冒号 <code class="px-1 py-0.5 rounded text-xs font-mono" :style="{ backgroundColor: 'var(--bg-primary)' }">:</code> 分隔</li>
          <li><strong>键名必须使用双引号包裹</strong>：这是 JSON 与 JavaScript 对象字面量的重要区别，JavaScript 允许不加引号或使用单引号，但 JSON 必须使用双引号</li>
          <li><strong>字符串值必须使用双引号</strong>：JSON 不支持单引号字符串</li>
          <li><strong>键值对之间用逗号分隔</strong>：最后一个键值对后面不能有逗号</li>
          <li><strong>花括号 <code class="px-1 py-0.5 rounded text-xs font-mono" :style="{ backgroundColor: 'var(--bg-primary)' }">{}</code> 表示对象</strong></li>
          <li><strong>方括号 <code class="px-1 py-0.5 rounded text-xs font-mono" :style="{ backgroundColor: 'var(--bg-primary)' }">[]</code> 表示数组</strong></li>
        </ul>
        <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
          <div class="text-xs font-medium mb-2" :style="{ color: 'var(--text-primary)' }">正确的 JSON vs 错误的 JSON：</div>
          <pre class="text-xs font-mono leading-relaxed" :style="{ color: 'var(--text-primary)' }">// ✅ 正确
{ "name": "Alice", "age": 25 }

// ❌ 错误 - 键名没有双引号
{ name: "Alice", age: 25 }

// ❌ 错误 - 使用单引号
{ 'name': 'Alice', 'age': 25 }

// ❌ 错误 - 多余的逗号
{ "name": "Alice", "age": 25, }</pre>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">三、JSON 数据类型</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>JSON 支持六种数据类型：</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">字符串（String）</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">"Hello World"<br>"123"<br>"true"</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">数字（Number）</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">42<br>3.14<br>-7</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">布尔值（Boolean）</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">true<br>false</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">数组（Array）</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">[1, 2, 3]<br>["a", "b"]</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">对象（Object）</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">{"key": "value"}</div>
          </div>
          <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
            <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">null</div>
            <div class="text-xs font-mono" :style="{ color: 'var(--text-primary)' }">null</div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">四、JSON 嵌套与复杂结构</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>JSON 的强大之处在于支持嵌套结构——对象中可以包含对象，数组中可以有对象和数组，通过组合可以表示任意复杂的数据关系。</p>
        <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
          <div class="text-xs font-medium mb-2" :style="{ color: 'var(--text-primary)' }">复杂嵌套示例：</div>
          <pre class="text-xs font-mono leading-relaxed" :style="{ color: 'var(--text-primary)' }">{
  "company": "Tech Corp",
  "founded": 2010,
  "employees": [
    {
      "id": 1,
      "name": "Alice",
      "department": "Engineering",
      "skills": ["JavaScript", "Python", "Go"],
      "address": {
        "city": "Beijing",
        "district": "Haidian"
      }
    },
    {
      "id": 2,
      "name": "Bob",
      "department": "Design",
      "skills": ["Figma", "Photoshop"],
      "address": {
        "city": "Shanghai",
        "district": "Pudong"
      }
    }
  ]
}</pre>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">五、JSON.parse() 与 JSON.stringify()</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>JavaScript 提供了两个核心的 JSON 操作方法：</p>

        <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
          <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">JSON.parse()</div>
          <p class="text-xs mb-2">将 JSON 字符串解析为 JavaScript 对象。如果字符串格式不正确，会抛出 SyntaxError。</p>
          <pre class="text-xs font-mono leading-relaxed" :style="{ color: 'var(--text-primary)' }">const jsonStr = '{"name":"Alice","age":25}';
const obj = JSON.parse(jsonStr);
console.log(obj.name); // "Alice"

// 带错误处理
try {
  const data = JSON.parse(malformedJson);
} catch (e) {
  console.error('JSON 解析失败:', e.message);
}</pre>
        </div>

        <div class="p-4 rounded-lg" :style="{ backgroundColor: 'var(--bg-primary)' }">
          <div class="font-semibold text-sm mb-1" :style="{ color: 'var(--text-primary)' }">JSON.stringify()</div>
          <p class="text-xs mb-2">将 JavaScript 对象转换为 JSON 字符串。第二个参数是 replacer（可替换或过滤值），第三个参数是缩进空格数。</p>
          <pre class="text-xs font-mono leading-relaxed" :style="{ color: 'var(--text-primary)' }">const obj = { name: "Alice", age: 25, password: "secret" };

// 基本转换
JSON.stringify(obj);
// '{"name":"Alice","age":25,"password":"secret"}'

// 美化输出（缩进 2 空格）
JSON.stringify(obj, null, 2);
// {
//   "name": "Alice",
//   "age": 25,
//   "password": "secret"
// }

// 过滤敏感字段
JSON.stringify(obj, ["name", "age"]);
// '{"name":"Alice","age":25}'

// 使用 replacer 函数
JSON.stringify(obj, (key, value) =>
  key === "password" ? undefined : value
);
// '{"name":"Alice","age":25}'</pre>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">六、JSON 的实际应用</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <p>JSON 在现代 Web 开发中无处不在，以下是几个主要应用场景：</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Web API 数据交换</strong>：RESTful API 和 GraphQL 都使用 JSON 作为请求和响应的数据格式。前后端分离架构中，JSON 是前后端通信的桥梁。</li>
          <li><strong>前端框架数据管理</strong>：Vue、React、Angular 都使用 JSON 格式来管理和传递组件数据、状态管理。</li>
          <li><strong>配置文件</strong>：许多工具和框架使用 JSON 作为配置文件格式，如 package.json、tsconfig.json、.eslintrc 等。</li>
          <li><strong>NoSQL 数据库</strong>：MongoDB 使用类 JSON 的 BSON（Binary JSON）格式存储数据，MongoDB 的查询语法也是基于 JSON 的。</li>
          <li><strong>浏览器存储</strong>：localStorage 和 sessionStorage 虽然只能存储字符串，但可以配合 JSON.stringify/parse 来存储对象数据。</li>
          <li><strong>实时通信</strong>：WebSocket 和 Server-Sent Events 常用 JSON 格式传输实时消息。</li>
        </ul>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4 pb-2 border-b" :style="{ borderColor: 'var(--border-color)' }">七、JSON 与 XML 对比</h2>
      <div class="text-sm leading-relaxed space-y-3" :style="{ color: 'var(--text-secondary)' }">
        <div class="overflow-x-auto">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="text-left">
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">特性</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">JSON</th>
                <th class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">XML</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">文件大小</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">更小（无结束标签）</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">更大（冗余标签）</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">解析速度</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">更快</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">较慢</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">可读性</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">简洁清晰</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">标签化，结构清晰但冗余</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">数组支持</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">原生支持</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">无原生数组</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">注释支持</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">不支持（JSON5 扩展支持）</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">支持</td>
              </tr>
              <tr>
                <td class="px-3 py-2 border font-medium" :style="{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">命名空间</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">不支持</td>
                <td class="px-3 py-2 border" :style="{ borderColor: 'var(--border-color)' }">支持</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <div class="p-4 rounded-lg text-sm" :style="{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }">
      <p class="font-semibold mb-1" :style="{ color: 'var(--text-primary)' }">总结</p>
      <p>JSON 以其简洁的语法、高效的解析性能和跨语言的支持能力，成为当今互联网数据交换的事实标准。掌握 JSON 是每一位开发者必备的基础技能。你可以使用本站的 JSON 格式化工具和 JSON 转 Go 工具来实践本文所学的知识。</p>
    </div>

    <AdBanner position="footer" />
  </div>
</template>
