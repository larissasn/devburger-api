/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Verifica se a coluna "category_id" já existe na tabela "products"
    const tableInfo = await queryInterface.describeTable('products');
    // Se a coluna "category_id" não existir, adiciona-a
    if (!tableInfo.category_id) {
      await queryInterface.addColumn('products', 'category_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      });
    }
  },
  // await queryInterface.addColumn('products', 'category_id', {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: 'categories',
  //     key: 'id',
  //   },
  //   onUpdate: 'CASCADE',
  //   onDelete: 'SET NULL',
  //   allowNull: true,
  // });
  // },

  async down(queryInterface) {
    // Remove a coluna "category_id" durante o rollback
    await queryInterface.removeColumn('products', 'category_id');
  },
};
