<script setup>
import {Edit, Delete} from '@element-plus/icons-vue'
import {reactive, ref} from 'vue'
import {addCategoryService, categoryListService, deleteCategoryService, updateCategoryService} from '@/api/category.js'
import {ElMessage, ElMessageBox} from "element-plus";

const categories = reactive([
  {
    id: 3,
    categoryName: "美食",
    categoryAlias: "my",
    createTime: "2023-09-02 12:06:59",
    updateTime: "2023-09-02 12:06:59"
  }
])

const getCategories = async () => {
  // 重置列表
  categories.length = 0
  let result = await categoryListService()
  // 重新赋值
  Object.assign(categories, result.data)
}

// 设置弹层
const dialogVisible = ref(false)
// 数据结构
const categoryData = reactive({
  categoryName : '',
  categoryAlias : ''
})
// 定义规则
const rules = {
  categoryName : [
    {required: true, message: '请输入分类名称', trigger: 'blur'},
  ],
  categoryAlias : [
    {required: true, message: '请输入分类别名', trigger: 'blur'},
  ]
}
// 关闭弹层清空数据
const clearData = () => {
  // 关闭弹层
  dialogVisible.value = false
  // 清空数据
  Object.assign(categoryData, {
    id: null,
    categoryName: '',
    categoryAlias : ''})

}

getCategories()
// 添加分类
const addOrUpdate = async () => {
  let result
  if (categoryData.id === null || categoryData.id === undefined) {
  // 得到返回结果
    result = await addCategoryService(categoryData)
  } else {
    result = await updateCategoryService(categoryData)
  }
  ElMessage.success(result.message? result.message : '添加成功')
  // 关闭弹层
  dialogVisible.value = false
  // 清空数据
  clearData()
  // 重新加载数据
  await getCategories()
}

const editCategory = (row) => {
  Object.assign(categoryData, {
    id: row.id,
    categoryName: row.categoryName,
    categoryAlias : row.categoryAlias
  })
  dialogVisible.value = true
}

const delCategory = (id) => {
  ElMessageBox.confirm(
      '是否要删除该分类?',
      'Warning',
      {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        let result = await deleteCategoryService(id)
        ElMessage.success(result.message? result.message : '删除成功')
        await getCategories()
      })
      .catch(() => {
        ElMessage.info( '取消删除')
      })
}

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章分类</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible = true">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="categories" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="categoryName"></el-table-column>
      <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="editCategory(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="delCategory(row.id)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"/>
      </template>
    </el-table>
  </el-card>

<!-- 弹出层 -->
  <el-dialog
      v-model="dialogVisible"
      title="添加分类"
      align-center
      width="30%"
      :before-close="clearData"
  >
    <el-form :model="categoryData" :rules="rules">
      <el-form-item prop="categoryName" label="分类名称">
        <el-input maxlength="10" minlength="1" v-model="categoryData.categoryName" />
      </el-form-item>
      <el-form-item prop="categoryAlias" label="分类别名">
        <el-input maxlength="10" minlength="1" v-model="categoryData.categoryAlias" />
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addOrUpdate">确定</el-button>
          <el-button @click="clearData" >取消</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  max-width: 90%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
