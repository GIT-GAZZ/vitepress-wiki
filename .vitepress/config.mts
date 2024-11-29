import { defineConfig } from 'vitepress'
import { withSidebar, generateSidebar } from 'vitepress-sidebar';
import markdownItTaskLists from 'markdown-it-task-lists'

// VitePress Sidebar（动态侧边栏）的配置选项：https://vitepress-sidebar.cdget.com/zhHans/guide/options
const vitePressSidebarOptions = {
  // 文档根路径
  documentRootPath: '/src',
  // 折叠
  collapsed: true,
  // 折叠默认深度
  collapseDepth: 1,
  // 排序：文件夹放顶部
  sortFolderTo: 'top',
  // 排序：文件名称中的数字会按照预期进行排序
  sortMenusOrderNumericallyFromTitle: true,
  // 调试打印
  debugPrint: true,
};

const multiSidebarKeys = ['编程语言/Java', '编程语言/Python']
// const tree = [{
//   text: '全部文档',
//   path: 'all-doc',
// }, {
//   text: '编程语言',
//   path: 'prog-language',
//   items: [{
//     text: 'Java',
//     path: 'Java',
//   }, {
//     text: 'Python',
//     path: 'Python',
//   }]
// }]
//
// function generateNav(tree, parentPath = '') {
//   return tree.map(node => {
//     const link = parentPath ? `${parentPath}/${node.path}` : node.path
//     const newNode = {
//       ...node,
//       link: link,
//     };
//
//     if (newNode.items && newNode.items.length > 0) {
//       newNode.items = generateNav(newNode.items, newNode.link);
//     }
//     return newNode;
//   });
// }
//
// const nav = generateNav(tree)

// VitePress的配置选项：https://vitepress.dev/zh/reference/site-config
const base = '/vitepress-wiki';
const vitePressOptions = {
  base: base,
  // 站点的标题（显示在浏览器标签中）
  title: '个人知识库',
  // titleTemplate: ':title | 个人知识库',
  // 站点的描述（写入HTML中）
  description: '基于 VitePress 的个人知识库',
  // HTML的<head>标签
  head: [['link', { rel: 'icon', href: `${base}/vitepress-logo-mini.svg` }]],

  ignoreDeadLinks: true,

  srcDir: './src',
  // rewrites: {
  //   'index.md': 'index.md',
  //   ':path(.*)': 'all-doc/:path',
  // },
  // rewrites: function (path) {
  //   if (path === 'index.md') {
  //     return path;
  //   }
  //   return [`all-doc/${path}`, path]
  // },

  // 默认主题的配置选项：https://vitepress.dev/zh/reference/default-theme-config
  themeConfig: {
    // 导航栏左边的LOGO
    logo: '/vitepress-logo-mini.svg',

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '显示详细列表',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 顶部导航栏
    nav: [{
      text: '全部文档',
      link: '/Welcome',
      // 高亮
      // activeMatch: `/`,
      activeMatch: `^(?!/(${multiSidebarKeys.join('|')})).*$`,
    }, {
      text: '编程语言',
      items: [{
        text: 'Java',
        link: '/编程语言/Java/Java开发规范.md',
        // 高亮
        activeMatch: '/编程语言/Java',
      }, {
        text: 'Python',
        link: '/编程语言/Python/概述.html',
        // 高亮
        activeMatch: '/编程语言/Python',
      }],
      // 高亮
      activeMatch: '/编程语言',
    }],

    // 导航栏右侧的社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/GIT-GAZZ/vitepress-wiki' }],

    // 左侧边栏
    sidebar: {
      '/': [{
        text: '全部文档',
        items: generateSidebar(vitePressSidebarOptions)
      }],
      // '/all-doc/': {
      //   base: '/all-doc/',
      //   items: [{
      //     text: '全部文档',
      //     items: generateSidebar(vitePressSidebarOptions)
      //   }]
      // },
      ...generateSidebar(multiSidebarKeys.map(multiSidebarKey => {
          return {
            ...vitePressSidebarOptions,
            scanStartPath: multiSidebarKey,
            basePath: `/${multiSidebarKey}/`,
            resolvePath: `/${multiSidebarKey}/`,
          }
        }
      ))
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/GIT-GAZZ/vitepress-wiki/edit/main/src/:path',
      text: '在 GitHub 上编辑此页面'
    },
    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: ['full', 'long', 'medium', 'short'][2],
        timeStyle: ['full', 'long', 'medium', 'short'][2]
      }
    },
    // 文档翻页按钮
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    // 页脚信息
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2024-2024 GAZZ'
    }
  },

  markdown: {
    // 代码块语言别名
    languageAlias: {
      'svg': 'html',
      'mysql': 'sql'
    },
    config: (md) => {
      md.use(markdownItTaskLists)
    }
  }
}

export default defineConfig(vitePressOptions);
// export default defineConfig(withSidebar(vitePressOptions, [
//   {
//     ...vitePressSidebarOptions,
//     scanStartPath: '编程语言',
//     basePath: '/编程语言/',
//     resolvePath: '/编程语言/',
//   },
//   {
//     ...vitePressSidebarOptions,
//     scanStartPath: '编程语言',
//     basePath: '/编程语言/',
//     resolvePath: '/编程语言/',
//   }
// ]));
